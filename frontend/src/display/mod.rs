use crate::display::layer::layer_to_transform;
use bevy::render::mesh::*;
use bevy::sprite::Material2dKey;
use bevy::{
    asset::AssetMetaCheck,
    prelude::*,
    render::{render_resource::AsBindGroup, view::window},
    sprite::{Material2d, Material2dPlugin},
    window::PrimaryWindow,
};
use std::ops::*;
pub mod camera;
pub mod layer;
use bevy::render::render_resource::*;

pub fn display_plugin(app: &mut App) {
    app.insert_resource(ClearColor(Color::srgb(0.2, 0.55, 0.2)))
        .add_systems(Startup, spawn_background_grid)
        .add_plugins(Material2dPlugin::<GridMaterial>::default())
        .add_systems(
            PostUpdate,
            layer_to_transform.before(TransformSystem::TransformPropagate),
        ).add_systems(
            Update,
            loop_background_grid
                .after(camera::move_camera_to_camera_target)
        );
}

#[derive(Debug, Clone, Reflect, Asset, AsBindGroup)]
pub struct GridMaterial {
    #[uniform(0)]
    line_color: LinearRgba,

    #[uniform(1)]
    line_width: f32,

    #[uniform(2)]
    tile_size: f32,
}
impl Material2d for GridMaterial {
    fn vertex_shader() -> ShaderRef {
        "shaders/grid.wgsl".into()
    }
    fn fragment_shader() -> ShaderRef {
        "shaders/grid.wgsl".into()
    }
    fn alpha_mode(&self) -> bevy::sprite::AlphaMode2d {
        bevy::sprite::AlphaMode2d::Blend
    }
}

#[derive(Component, Debug, Reflect, Default, Clone, PartialEq, Eq, Hash)]
pub struct BackgroundGrid;
pub fn spawn_background_grid(
    mut commands: Commands,
    window: Single<&Window, With<PrimaryWindow>>,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<GridMaterial>>,
) {
    commands.spawn((
        Mesh2d(meshes.add(Rectangle::new(200., 200.))),
        MeshMaterial2d(materials.add(GridMaterial {
            tile_size: 1.,
            line_width: 0.08,
            line_color: LinearRgba::new(0.0, 0.2, 0.0, 0.7),
        })),
        Transform::from_xyz(0., 0., 0.),
        Name::new("Background Grid"),
    ));
}
pub fn loop_background_grid(
    camera_transform: Single<&Transform, (With<PrimaryWindow>, Without<BackgroundGrid>, Changed<Transform>)>,
    mut grid_transform: Single<&mut Transform, With<BackgroundGrid>>,
) {
    grid_transform.translation = vec3(camera_transform.translation.x % 1., camera_transform.translation.y % 1., 0.);
}