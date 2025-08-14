use bevy::prelude::*;

use crate::{
    client::ClientPlayer,
    entity::collider::{Collider, LastTickPosition, LastTickVelocity, Position, Velocity},
};

pub fn physics_plugin(app: &mut App) {
    app.add_systems(FixedUpdate, move_entities);
}
fn move_entities(q_entities: Query<(&mut LastTickPosition, &mut LastTickVelocity, &mut Position, &mut Velocity, Has<ClientPlayer>)>, time: Res<Time<Fixed>>) {
    for (mut last_tick_position, mut last_tick_velocity, mut position, mut velocity, is_client_player) in q_entities {
        **last_tick_position += **last_tick_velocity * time.delta_secs();
        **last_tick_velocity *= f32::exp(-time.delta_secs() / 0.3);
    }
}
