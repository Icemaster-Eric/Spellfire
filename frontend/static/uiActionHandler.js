import { SerializedUIEvent, SerializedUIActionType } from "/frontend.js";

function emit_action(action) {
    console.log("emitted", action);
    switch (action.action_type) {
        case SerializedUIActionType.ToggleInventoryInterface:
            break;
        case SerializedUIActionType.UpdateInventory:
            let slotNum = action.data1;
            let accessoryId = action.data2;
            console.log(`Changing accessory in slot ${slotNum} to ID ${accessoryId}`);
            break;
        default:
            console.warn("Unknown action:", action);
            break;
    }
}
window.emit_action = emit_action;
