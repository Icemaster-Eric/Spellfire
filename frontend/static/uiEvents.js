import { SerializedUIEvent, SerializedUIActionType } from "/frontend.js";
import { toggleInventoryInterface } from "./ui/inventory.js";

let events = [];
export function emit_action(action, data1, data2) {
    console.log("emitted", action);
    switch (action) {
        case SerializedUIActionType.ToggleInventoryInterface:
            toggleInventoryInterface();
            break;
        case SerializedUIActionType.ChangeAccessory:
            let slotNum = data1;
            let accessoryId = data2;
            console.log(`Changing accessory in slot ${slotNum} to ID ${accessoryId}`);
            break;
        default:
            console.warn("Unknown action:", action);
            break;
    }
}
export function get_events() {
    let eventsCopy = [...events];
    events = [];
    return eventsCopy;
}
export function pushEvent(eventType, data1, data2) {
    events.push(new SerializedUIEvent(eventType, data1, data2));
}