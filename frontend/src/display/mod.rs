use bevy::{asset::AssetMetaCheck, prelude::*};

use crate::display::{entity_sprite::spawn_entity_sprites, layer::layer_to_transform, transform::collider_to_transform};
use std::ops::*;
pub mod entity_sprite;
pub mod transform;
pub mod player;
pub mod layer;

pub fn display_plugin(app: &mut App) {
    app
        .insert_resource(ClearColor(Color::srgb(0.2, 0.85, 0.2)))
        .add_systems(PostUpdate, layer_to_transform.before(TransformSystem::TransformPropagate))
        .add_systems(Update, (spawn_entity_sprites, collider_to_transform));
}