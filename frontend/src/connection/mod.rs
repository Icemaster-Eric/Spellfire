pub mod client_packets;
pub mod ping;
pub mod server_packets;

use bevy::prelude::*;
use protobuf::Message as _;
use wasm_sockets::{Message, PollingClient};

use crate::connection::client_packets::{ClientEvent, send_client_events};
use crate::connection::ping::{PingTimer, send_ping};
use crate::connection::server_packets::{InitializeEvent, PacketEntitiesSent, send_server_events};
use crate::protobuf_codegen::server_packet::ServerEvent;
use crate::protobuf_codegen::server_packet::{Entity as PacketEntity, ServerPacket};

pub struct Connection {
    client: PollingClient,
}

pub struct ConnectionPlugin {
    backend_url: &'static str,
}
impl ConnectionPlugin {
    pub fn new(backend_url: &'static str) -> Self {
        ConnectionPlugin { backend_url }
    }
}

impl Plugin for ConnectionPlugin {
    fn build(&self, app: &mut App) {
        app.insert_non_send_resource(Connection {
            client: PollingClient::new(self.backend_url).expect("could not connect to backend"),
        })
        .add_event::<PacketEntitiesSent>()
        .add_event::<InitializeEvent>()
        .add_event::<ClientEvent>()
        .insert_resource(PingTimer(Timer::from_seconds(5., TimerMode::Repeating)))
        .add_systems(FixedUpdate, (send_server_events, send_ping))
        .add_systems(FixedUpdate, send_client_events);
    }
}
