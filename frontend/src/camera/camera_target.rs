use bevy::prelude::*;

use crate::client::{self, ClientPlayer};

#[derive(Component, Debug)]
#[require(Transform = Transform::default())]
pub enum CameraTarget {
    FollowingClient { offset: Vec2 },
    Static { at: Vec2 },
}
pub fn spawn_camera_target(mut commands: Commands) {
    commands.spawn(CameraTarget::FollowingClient { offset: Vec2::ZERO });
}
pub fn move_camera_target(
    mut camera_target_param_set: ParamSet<(
        Single<(&CameraTarget, &mut Transform)>,
        TransformHelper,
    )>,
    client_player_entity: Single<Entity, With<ClientPlayer>>,
) {
    match camera_target_param_set.p0().0 {
        CameraTarget::FollowingClient { offset } => {
            let offset = offset.extend(0.);
            let Ok(client_player_transform) = camera_target_param_set
                .p1()
                .compute_global_transform(*client_player_entity)
            else {
                return;
            };
            camera_target_param_set.p0().1.translation = client_player_transform.translation() + offset;
        }
        CameraTarget::Static { at } => {
            camera_target_param_set.p0().1.translation = at.extend(0.);
        }
    }
}
