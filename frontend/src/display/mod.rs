use bevy::{asset::AssetMetaCheck, prelude::*};

use crate::display::{
    layer::layer_to_transform,
};
use std::ops::*;
pub mod layer;
pub mod camera;

pub fn display_plugin(app: &mut App) {
    app.insert_resource(ClearColor(Color::srgb(0.2, 0.55, 0.2)))
        .add_systems(
            PostUpdate,
            layer_to_transform.before(TransformSystem::TransformPropagate),
        );
}
