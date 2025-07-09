import { Reactive } from "../communication/reactive";
import  { type Vec2, vec2 } from "../lib/vec2";

export class Settings {
    keybinds: Keybinds = Keybinds.default();
}
type ControlAction = { type: "move", payload: { direction: Vec2 } }

export class Keybinds extends Reactive<Map<string, ControlAction>> {
    _data = new Map();
    assign(obj: Record<string, ControlAction>) {
        this.set(new Map(Object.entries(obj)));
    }
    static default() {
        const keybinds = new Keybinds();
        keybinds.assign({
            "KeyW": { type: "move", payload:{ direction: vec2(0, 1) }},
            "KeyA": { type: "move", payload:{direction: vec2(-1, 0) }},
            "KeyS": { type: "move", payload:{direction: vec2(0, -1) }},
            "KeyD": { type: "move", payload:{direction: vec2(1, 0) }},
        });
        return keybinds;
    }
}