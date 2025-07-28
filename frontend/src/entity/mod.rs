pub mod collider;
pub mod entity_types;
use bevy::prelude::*;

use crate::entity::{collider::Collider, entity_types::{Bullet, Bush, Gunner, Mage, Rock, Tree}};

#[derive(Component, Deref, DerefMut, Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Reflect)]
pub struct EntityID(pub u32);

pub fn entity_plugin(app: &mut App) {
    app
    .register_type::<EntityID>();
}