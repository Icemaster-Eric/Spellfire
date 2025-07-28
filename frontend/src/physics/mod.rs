use bevy::prelude::*;

use crate::{
    client::ClientPlayer,
    entity::collider::{Collider, Position, Velocity},
};

pub fn physics_plugin(app: &mut App) {
    app.add_systems(FixedUpdate, move_entities);
}
fn move_entities(q_entities: Query<(&mut Position, &Velocity, Option<&ClientPlayer>)>, time: Res<Time>) {
    for (mut position, velocity, client_player) in q_entities {
        **position += **velocity * time.delta_secs();
        if client_player.is_some() {
           //info!("pos:{:?} vel:{:?}", position, velocity);
        }
    }
}
