use std::ops::DerefMut;

use bevy::{prelude::*, window::PrimaryWindow};

use crate::{
    client::{keybinds::{Action, InputMethods}, ClientPlayer}, connection::client_packets::ClientEvent, entity::collider::{Rotation, Velocity}, ui::{actions::UIAction, events::UIEvent},
};
use crate::client::keybinds::Keybinds;

pub fn move_client(
    mut client: Single<(&mut Velocity,), With<ClientPlayer>>,
    mut client_event_writer: EventWriter<ClientEvent>,
    input_methods: InputMethods,
    keybinds: Res<Keybinds>,
) {
    let (client_velocity,) = &mut *client;
    let move_dir = get_move_dir(&input_methods, &keybinds);
    if move_dir != Vec2::ZERO {
        ***client_velocity = move_dir.normalize_or_zero() * 3.;
    }
    client_event_writer.write(ClientEvent::Move {
        x: move_dir.x,
        y: move_dir.y,
    });
}

fn get_move_dir(input_methods: &InputMethods, keybinds: &Keybinds) -> Vec2 {
    let mut move_dir = vec2(0., 0.);
    if let Some(input) = keybinds.get_input_from_action(Action::MoveN) {
        if input_methods.is_pressed(input) {
            move_dir.y += 1.;
        }
    }
    if let Some(input) = keybinds.get_input_from_action(Action::MoveS) {
        if input_methods.is_pressed(input) {
            move_dir.y -= 1.;
        }
    }
    if let Some(input) = keybinds.get_input_from_action(Action::MoveW) {
        if input_methods.is_pressed(input) {
            move_dir.x -= 1.;
        }
    }
    if let Some(input) = keybinds.get_input_from_action(Action::MoveE) {
        if input_methods.is_pressed(input) {
            move_dir.x += 1.;
        }
    }
    return move_dir;
}

pub fn aim_client(mut client_rotation: Single<&mut Rotation, With<ClientPlayer>>, window: Single<&Window, With<PrimaryWindow>>, mut client_event_writer: EventWriter<ClientEvent>) {
    if let Some(cursor_pos) = window.cursor_position() {
        ***client_rotation = ((cursor_pos - (window.size() / 2.)) * vec2(1., -1.)).to_angle();
    }
}

pub fn open_inventory(input_methods: InputMethods, keybinds: Res<Keybinds>, mut ui_actions_writer: EventWriter<UIAction>) {
        if let Some(input) = keybinds.get_input_from_action(Action::ToggleInventoryInterface) {
            if input_methods.is_just_pressed(input) {
                ui_actions_writer.write(UIAction::ToggleInventoryInterface);
            }
        }
}