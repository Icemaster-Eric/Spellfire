use std::{cell::RefCell, mem, ops::DerefMut};

use bevy::{prelude::*, utils::syncunsafecell::SyncUnsafeCell};
use js_sys::Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub enum SerializedUIActionType {
    ToggleInventoryInterface = 0, // No data
    UpdateInventory = 1, // data1 is slot num, data2 is item id
}

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct SerializedUIAction {
    pub action_type: SerializedUIActionType,
    pub data1: u32,
    pub data2: u32,
}

#[wasm_bindgen]
impl SerializedUIAction {
    #[wasm_bindgen(constructor)]
    pub fn new(action_type: SerializedUIActionType, data1: u32, data2: u32) -> Self {
        Self { action_type, data1, data2 }
    }
}

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub enum SerializedUIEventType {
    ChangeAttachment = 0, // data1 is slot num, data2 is accessory id
    MoveItem = 1, // data1 is from slot num, data2 is to slot num

}

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct SerializedUIEvent {
    pub event_type: SerializedUIEventType,
    pub data1: u32,
    pub data2: u32,
}

#[wasm_bindgen]
impl SerializedUIEvent {
    #[wasm_bindgen(constructor)]
    pub fn new(event_type: SerializedUIEventType, data1: u32, data2: u32) -> Self {
        Self { event_type, data1, data2 }
    }
}

#[wasm_bindgen]
unsafe extern "C" {
    pub fn emit_action(action: SerializedUIAction);
}
thread_local! {
    static UI_EVENTS: RefCell<Vec<SerializedUIEvent>> = RefCell::new(Vec::new());
}

#[wasm_bindgen(js_name = "addEvent")]
pub fn add_event(event_type: SerializedUIEventType, data1: u32, data2: u32) {
    info!("recv {:?} {} {}", event_type, data1, data2);
    UI_EVENTS.with(|ui_events| {
        ui_events.borrow_mut().push(SerializedUIEvent { event_type, data1, data2 });
    });
}

pub fn get_events() -> Vec<SerializedUIEvent> {
    UI_EVENTS.with(|ui_events| {
        return mem::take(ui_events.borrow_mut().deref_mut());
    })
}