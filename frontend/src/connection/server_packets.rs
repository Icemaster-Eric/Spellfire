use bevy::prelude::*;
use protobuf::Message as _;
use wasm_sockets::Message;

use crate::{
    connection::Connection,
    protobuf_codegen::server_packet::{Entity as PacketEntity, ServerPacket},
};

#[derive(Event, Deref, Debug)]
pub struct PacketEntitiesSent(pub Vec<PacketEntity>);

#[derive(Event, Debug)]
pub struct InitializeEvent {
    pub client_id: u32,
}

pub fn send_server_events(
    mut packet_entities_writer: EventWriter<PacketEntitiesSent>,
    mut initialize_event_writer: EventWriter<InitializeEvent>,
    mut connection: NonSendMut<Connection>,
) {
    for msg in connection.client.receive() {
        match msg {
            Message::Binary(bin) => {
                if let Ok(server_packet) = ServerPacket::parse_from_bytes(&bin) {
                    packet_entities_writer.write(PacketEntitiesSent(server_packet.entities));
                    info!("received events: {:?}", server_packet.events);
                    for event in server_packet.events {
                        match event.type_.enum_value_or_default() {
                            crate::protobuf_codegen::server_packet::server_event::ServerEventType::SERVER_EVENT_TYPE_UNSPECIFIED => unimplemented!(),
                            crate::protobuf_codegen::server_packet::server_event::ServerEventType::ENTER_GAME => {
                                initialize_event_writer.write(InitializeEvent { client_id: event.enter_game_player_id });
                            },
                        }
                    }
                    
                } else {
                    error!("parsing server packet failed");
                }
            }
            _ => {}
        }
    }
}
