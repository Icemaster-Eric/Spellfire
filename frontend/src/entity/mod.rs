pub mod collider;
pub mod entity_types;
use bevy::prelude::*;

use crate::entity::{collider::{collider_plugin, Collider}, entity_types::{entity_spawning_plugin, Bullet, Bush, Rock, Tree}};

#[derive(Component, Deref, DerefMut, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Reflect)]
pub struct EntityID(pub u32);

pub fn entity_plugin(app: &mut App) {
    app
    .register_type::<EntityID>()
    .add_plugins(collider_plugin)
    .add_plugins(entity_spawning_plugin);
}