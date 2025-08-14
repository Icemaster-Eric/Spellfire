use bevy::prelude::*;
use wasm_bindgen::prelude::*;

use crate::ui::ffi::{self, SerializedUIAction, SerializedUIActionType, SerializedUIEvent, SerializedUIEventType};

#[derive(Debug, Clone, Copy, Event)]
pub enum UIEvent {
    ChangeAttachment { slot_num: u32, accessory_id: u32 },
    MoveItem { from_slot: u32, to_slot: u32 },
}
impl Into<SerializedUIEvent> for UIEvent {
    fn into(self) -> SerializedUIEvent {
        match self {
            UIEvent::ChangeAttachment { slot_num, accessory_id } => SerializedUIEvent::new(
                SerializedUIEventType::ChangeAttachment,
                slot_num,
                accessory_id,
            ),
            UIEvent::MoveItem { from_slot, to_slot } => SerializedUIEvent::new(
                SerializedUIEventType::MoveItem,
                from_slot,
                to_slot,
            ),
        }
    }
}
pub fn emit_ui_events(mut ui_events_writer: EventWriter<UIEvent>) {
    for event in ffi::get_events() {
        let ui_event = match event.event_type {
            SerializedUIEventType::ChangeAttachment => UIEvent::ChangeAttachment {
                slot_num: event.data1,
                accessory_id: event.data2,
            },
            SerializedUIEventType::MoveItem => UIEvent::MoveItem {
                from_slot: event.data1,
                to_slot: event.data2,
            },
        };
        ui_events_writer.write(ui_event);
    }
}