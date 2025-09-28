use bevy::prelude::*;
use wasm_bindgen::prelude::*;

use crate::ui::ffi::{self, SerializedUIAction, SerializedUIActionType, SerializedUIEvent, SerializedUIEventType};

#[derive(Debug, Clone, Copy, Event)]
pub enum UIAction {
    ToggleInventoryInterface,
    UpdateInventory { slot_num: u32, item_id: u32 },
}

impl Into<SerializedUIAction> for UIAction {
    fn into(self) -> SerializedUIAction {
        match self {
            UIAction::ToggleInventoryInterface => SerializedUIAction::new(
                SerializedUIActionType::ToggleInventoryInterface,
                0,
                0,
            ),
            UIAction::UpdateInventory { slot_num, item_id } => SerializedUIAction::new(
                SerializedUIActionType::UpdateInventory,
                slot_num,
                item_id,
            ),
        }
    }
}

pub fn send_ui_actions(mut ui_actions_reader: EventReader<UIAction>) {
    for action in ui_actions_reader.read() {
        let serialized_action = (*action).into();
        ffi::emit_action(serialized_action);
    }
}