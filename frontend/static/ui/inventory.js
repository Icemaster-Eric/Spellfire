import { pushEvent } from "/uiEvents.js";
import { SerializedUIEventType } from "/frontend.js";

let inventoryEl = document.getElementById("inventory");
export function toggleInventoryInterface() {
    inventoryEl.style.display = inventoryEl.style.display === "none" ? "flex" : "none";
}
inventoryEl.addEventListener("click", (e) => {
    pushEvent(SerializedUIEventType.ChangeAccessory, 1, 2);
});