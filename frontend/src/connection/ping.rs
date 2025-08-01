use bevy::prelude::*;

use crate::connection::Connection;

#[derive(Resource, Deref, DerefMut)]
pub struct PingTimer(pub Timer);

pub fn send_ping(connection: NonSend<Connection>, time: Res<Time>, mut timer: ResMut<PingTimer>) {
    timer.tick(time.delta());
    if timer.just_finished() {
        let _ = connection.client.send_string("ping");
    }
}
