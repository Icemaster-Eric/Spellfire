import { System } from "../communication/system";
import type { Inputs } from "./inputs";
import type { World } from "../world/world";

export class DebugInfo {
    latency = 0;
    packetsPublished = 0;
    renderedEntitiesCount = 0;
}
export class DebugInfoUISystem extends System {
    controls: Inputs;
    world: World;
    debugInfo: DebugInfo;
    el = document.getElementById("debug-info")!;
    startTime = Date.now();
    constructor(controls: Inputs, world: World, debugInfo: DebugInfo) {
        super();
        this.controls = controls;
        this.world = world;
        this.debugInfo = debugInfo;
    }
    update() {
        if (!this.world.clientPlayerExists()) {
            this.el.textContent = "";
            return;
        }
        const debugInfo = [
            `pos: (${this.world.getClientPlayer()!.currentLocalCollider.position.join(", ")})`,
            `ping: ${this.debugInfo.latency}ms`,
            `packets per sec: ${this.debugInfo.packetsPublished / ((Date.now() - this.startTime) / 1000)}`,
            `rendered entities: ${this.debugInfo.renderedEntitiesCount}`,
            `rotation: ${this.world.getClientPlayer?.()?.currentLocalCollider?.rotation}`,
        ]
            .map((line) => `<div>${line}</div>`)
            .join("<br />");
        this.el.innerHTML = debugInfo;
    }
}
