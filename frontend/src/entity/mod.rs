pub mod collider;
pub mod entity_types;
use bevy::prelude::*;

use crate::entity::{
    collider::{Collider, Position, Rotation, Velocity, collider_plugin},
    entity_types::{Bullet, Bush, Rock, Tree, entity_spawning_plugin},
};

#[derive(Component, Deref, DerefMut, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Reflect)]
pub struct EntityID(pub u32);

pub fn entity_plugin(app: &mut App) {
    app.register_type::<EntityID>()
        .register_type::<Position>()
        .register_type::<Velocity>()
        .register_type::<Rotation>()
        .add_plugins(collider_plugin)
        .add_plugins(entity_spawning_plugin);
}
