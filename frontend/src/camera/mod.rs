pub mod camera_target;

use bevy::{
    prelude::*,
    render::camera::{self, Viewport},
    window::PrimaryWindow,
};

use crate::{
    camera::camera_target::{move_camera_target, spawn_camera_target, CameraTarget},
    display::transform::collider_to_transform,
};

#[derive(Component)]
#[component(storage = "SparseSet")]
pub struct GameCamera;

pub fn spawn_camera(mut commands: Commands, window: Single<&Window, With<PrimaryWindow>>) {
    let world_view_width = 16.;
    let world_view_height = 9.;

    let mut camera_proj = OrthographicProjection::default_2d();
    if window.width() / window.height() > 16. / 9. {
        // wider
        camera_proj.scaling_mode = camera::ScalingMode::FixedVertical {
            viewport_height: world_view_height,
        };
    } else {
        camera_proj.scaling_mode = camera::ScalingMode::FixedHorizontal {
            viewport_width: world_view_width,
        };
    }

    commands.spawn((Camera2d, GameCamera, Projection::Orthographic(camera_proj)));
}

pub fn move_camera_to_camera_target(
    camera_target_pos: Single<&Transform, (With<CameraTarget>, Without<GameCamera>)>,
    mut camera_transform: Single<&mut Transform, With<GameCamera>>,
) {
    camera_transform.translation = camera_target_pos.translation;
}

pub fn camera_plugin(app: &mut App) {
    app.add_systems(Startup, (spawn_camera, spawn_camera_target)).add_systems(
        Update,
        (
            move_camera_to_camera_target,
            move_camera_target
                .before(move_camera_to_camera_target)
                .after(collider_to_transform),
        ),
    );
}
