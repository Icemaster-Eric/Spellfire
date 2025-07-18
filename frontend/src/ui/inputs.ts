import { Publisher } from "../communication/publisher";
import { vec2, type Vec2 } from "../math/vec2";

export type InputAction = "moveN" | "moveE" | "moveS" | "moveW" | "fire";

type InputMessages = {
    start_action: { actionType: InputAction };
    stop_action: { actionType: InputAction };
    pointer_move: { screen_position: Vec2 };
};

export class Inputs extends Publisher<InputMessages> {
    keybinds: Map<string, InputAction> = new Map(
        Object.entries({
            KeyW: "moveN",
            KeyA: "moveW",
            KeyS: "moveS",
            KeyD: "moveE",
            MouseButton0: "fire",
        }),
    );
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
        document.body.addEventListener("mousedown", (ev) => {
            let action = this.keybinds.get("MouseButton" + ev.button);
            if (action) {
                this.publish("start_action", { actionType: action });
            }
        });
        document.body.addEventListener("mouseup", (ev) => {
            let action = this.keybinds.get("MouseButton" + ev.button);
            if (action) {
                this.publish("stop_action", { actionType: action });
            }
        });
        document.body.addEventListener("pointermove", (ev) => {
            this.publish("pointer_move", { screen_position: vec2(ev.x, ev.y) });
        });
    }

    _subscribers = {
        start_action: [],
        stop_action: [],
        pointer_move: []
    };
}
