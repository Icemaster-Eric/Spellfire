pub mod camera_target;

use bevy::{
    prelude::*,
    render::camera::{self, Viewport},
    window::PrimaryWindow,
};

use crate::{
    client::ClientPlayer, display::camera::camera_target::CameraTarget, entity::collider::{collider_to_transform, Position}};

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
    camera_target: Res<CameraTarget>,
    mut camera_transform: Single<&mut Transform, With<GameCamera>>,
    player_pos: Single<&Position, With<ClientPlayer>>,
) {
    match *camera_target {
        CameraTarget::FollowingClient { offset } => {
            camera_transform.translation = (player_pos.0 + offset).extend(0.);
        }
        CameraTarget::Static { at } => {
            camera_transform.translation = at.extend(0.);
        }
    }
}

pub fn camera_plugin(app: &mut App) {
    app.insert_resource(CameraTarget::FollowingClient { offset: Vec2::ZERO }).add_systems(Startup, (spawn_camera)).add_systems(
        Update,
        (
            move_camera_to_camera_target,
        ),
    );
}
