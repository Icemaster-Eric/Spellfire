use bevy::prelude::*;

use crate::display::layer::Layer;

#[derive(Component)]
pub struct LeftHand;

#[derive(Component)]
pub struct RightHand;

pub fn player_components(asset_server: &AssetServer) -> impl Bundle {
    return (
        Sprite {
            image: asset_server.load("playerBody.png"),
            custom_size: Some(vec2(0.3, 0.3)),
            ..default()
        },
        Layer::PLAYER,
        children![
            (
                LeftHand,
                Name::new("Left Hand"),
                Sprite {
                    image: asset_server.load("playerHand.png"),
                    custom_size: Some(vec2(0.3, 0.3)),
                    ..default()
                },
                Transform::from_xyz(1., 1., 0.)
            ),
            (
                RightHand,
                Name::new("Right Hand"),
                Sprite {
                    image: asset_server.load("playerHand.png"),
                    custom_size: Some(vec2(0.3, 0.3)),
                    ..default()
                },
                Transform::from_xyz(1., -1., 0.)
            ),
        ],
    );
}

pub fn animate_player(players: Query<Player>) {

}