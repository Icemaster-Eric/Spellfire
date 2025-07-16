import { System } from "../communication/system";
import type { Controls } from "./controls";
import type { World } from "../world/world";

export class DebugInfoUISystem extends System {
    controls: Controls;
    world: World;
    el = document.getElementById("debug-info")!;
    constructor(controls: Controls, world: World) {
        super();
        this.controls = controls;
        this.world = world;
    }
    update() {
        if (!this.world.clientPlayerExists()) {
            this.el.textContent = "";
            return;
        }
        const debugInfo = [
            `pos: (${this.world.getClientPlayer()!.localCollider.position.join(", ")})`,
        ].join("\n");
        this.el.textContent = debugInfo;
    }
}
