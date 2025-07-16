import { Graphics } from "pixi.js";
import { Entity } from "../entity";
import { entitySpec } from "../entitySpec";

export class Tree extends Entity {
    sprite = treeSprite();
    updateSprite(): void {
        super.updateSprite();
    }
}
function treeSprite(): Graphics {
    const g = new Graphics();

    g.setStrokeStyle({ width: 0 });
    g.circle(0, 0, 50).fill("green");

    return g;
}
