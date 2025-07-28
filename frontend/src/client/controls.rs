use std::ops::DerefMut;

use bevy::{prelude::*, window::PrimaryWindow};

use crate::{
    client::ClientPlayer, connection::client_packets::ClientEvent, entity::collider::{Rotation, Velocity},
};

pub fn move_client(
    keys: Res<ButtonInput<KeyCode>>,
    mut client: Single<(&mut Velocity,), With<ClientPlayer>>,
    mut client_event_writer: EventWriter<ClientEvent>,
) {
    let (client_velocity,) = &mut *client;
    let move_dir = get_move_dir(keys);

    ***client_velocity = move_dir.normalize_or_zero() * 2.;
    client_event_writer.write(ClientEvent::Move {
        x: move_dir.x,
        y: move_dir.y,
    });
}

fn get_move_dir(keys: Res<ButtonInput<KeyCode>>) -> Vec2 {
    let mut move_dir = vec2(0., 0.);
    if keys.pressed(KeyCode::KeyW) {
        move_dir.y += 1.;
    }
    if keys.pressed(KeyCode::KeyS) {
        move_dir.y -= 1.;
    }
    if keys.pressed(KeyCode::KeyA) {
        move_dir.x -= 1.;
    }
    if keys.pressed(KeyCode::KeyD) {
        move_dir.x += 1.;
    }
    return move_dir;
}

pub fn aim_client(mut client_rotation: Single<&mut Rotation, With<ClientPlayer>>, window: Single<&Window, With<PrimaryWindow>>) {
    if let Some(cursor_pos) = window.cursor_position() {
        ***client_rotation = ((cursor_pos - (window.size() / 2.)) * Vec2::NEG_Y).to_angle();
    }
}