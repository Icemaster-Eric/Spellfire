pub mod ffi;
pub mod events;
pub mod actions;
use bevy::{app, prelude::*};
use wasm_bindgen::prelude::*;

use crate::ui::{actions::UIAction, events::UIEvent, ffi::{SerializedUIAction, SerializedUIActionType, SerializedUIEvent, SerializedUIEventType}};

pub fn ui_plugin(app: &mut App) {
    app.add_event::<UIAction>()
        .add_event::<UIEvent>()
        .add_systems(PreUpdate, actions::send_ui_actions)
        .add_systems(PreUpdate, events::emit_ui_events);
}