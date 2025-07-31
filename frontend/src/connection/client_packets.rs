use bevy::{prelude::*, window::PrimaryWindow};
use protobuf::Message as _;
use wasm_sockets::ConnectionStatus;
use wasm_timer::{SystemTime, UNIX_EPOCH};

use crate::{
    connection::Connection,
    protobuf_codegen::{
        client_packet::{
            ClientEvent as PacketClientEvent, ClientPacket,
            client_event::ClientEventType as PacketClientEventType,
        },
        types::{Timestamp, Vec2 as PacketVec2},
    },
};

#[derive(Event, Debug)]
pub enum ClientEvent {
    Move { x: f32, y: f32 },
}

pub fn send_client_events(
    mut client_events: EventReader<ClientEvent>,
    connection: NonSend<Connection>,
    window: Single<&Window, With<PrimaryWindow>>,
) {
    if connection.client.status() != ConnectionStatus::Connected {
        return;
    }
    let mut timestamp = Timestamp::new();
    timestamp.ms = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as u64;
    let packet_client_events = client_events
        .read()
        .map(|client_event| match client_event {
            &ClientEvent::Move { x, y } => PacketClientEvent {
                type_: PacketClientEventType::MOVE.into(),
                movement: protobuf::MessageField::some(PacketVec2 {
                    x: x as f64,
                    y: y as f64,
                    ..Default::default()
                }),
                ..Default::default()
            },
        })
        .collect();
    
    let cursor_pos = window.cursor_position().unwrap_or_default();
    let rel_cursor_pos = (window.size() / 2. - cursor_pos) * Vec2::NEG_Y;
    let client_packet = ClientPacket {
        cursor: protobuf::MessageField::some(PacketVec2 {
            x: rel_cursor_pos.x as f64,
            y: rel_cursor_pos.y as f64,
            ..Default::default()
        }),
        events: packet_client_events,

        ..Default::default()
    };

    if let Ok(bin) = client_packet.write_to_bytes() {
        let _ = connection.client.send_binary(bin);
    } else {
        error!("making client packet failed");
    }
}
