import { Publisher } from "../communication/publisher";
import { vec2, type Vec2 } from "../lib/vec2";
import type { Keybinds } from "../state/settings";

type ControlMessages = {
    move: { direction: Vec2 }
}

export class Controls extends Publisher<ControlMessages> {
    constructor(keybinds: Keybinds) {
        super();
        document.body.addEventListener("keydown", (ev) => {
            let action = keybinds.deref().get(ev.code);
            if (action) {
                this.publish(action.type, action.payload);
            }
        })
    }
    _subscribers = {
        move: []
    }
}