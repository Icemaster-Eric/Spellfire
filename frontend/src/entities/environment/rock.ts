import { Graphics } from "pixi.js";
import { Entity } from "../entity";

export class Rock extends Entity {
    sprite = rockSprite();
    updateSprite(): void {
        super.updateSprite();
    }
}
function rockSprite(): Graphics {
    const g = new Graphics();

    g.setStrokeStyle({ width: 0 });
    g.circle(0, 0, 50).fill("gray");

    return g;
}
