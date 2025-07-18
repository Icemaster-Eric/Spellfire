import { vec2, type Vec2 } from "../math/vec2";
import type { Item } from "./item";

export class PlayerState {
    health: number;
    primaryWeapon: Item;
    relativeCursorPos: Vec2 = vec2(0);
    constructor(health: number, primaryWeapon: Item) {
        this.health = health;
        this.primaryWeapon = primaryWeapon;
    }
}
