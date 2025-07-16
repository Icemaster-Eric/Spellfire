import { Publisher } from "../communication/publisher";
import { vec2, type Vec2 } from "../math/vec2";

export type ControlAction = "moveN" | "moveE" | "moveS" | "moveW";

type ControlMessages = {
    start_action: { actionType: ControlAction };
    stop_action: { actionType: ControlAction };
};

export class Controls extends Publisher<ControlMessages> {
    keybinds: Map<string, ControlAction> = new Map(Object.entries({
        KeyW: "moveN", 
        KeyA: "moveW",
        KeyS: "moveS",
        KeyD: "moveE"
    }));
    constructor() {
        super();
        document.body.addEventListener("keydown", (ev) => {
            if (ev.repeat) return;
            let action = this.keybinds.get(ev.code);
            if (action) {
                this.publish("start_action", { actionType: action });
            }
        });
        document.body.addEventListener("keyup", (ev) => {
            let action = this.keybinds.get(ev.code);
            if (action) {
                this.publish("stop_action", { actionType: action });
            }
        });
    }

    _subscribers = {
        start_action: [],
        stop_action: [],
    };
}
