use bevy::prelude::*;
use wasm_sockets::ConnectionStatus;

use crate::connection::Connection;

#[derive(Resource, Deref, DerefMut)]
pub struct PingTimer(pub Timer);

pub fn send_ping(connection: NonSend<Connection>, time: Res<Time>, mut timer: ResMut<PingTimer>) {
    timer.tick(time.delta());
    if timer.just_finished() {
        if connection.client.status() == ConnectionStatus::Connected {
            let _ = connection.client.send_string("ping");
        }
    }
}
