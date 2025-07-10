import { Graphics } from "pixi.js";
import { Entity } from "../entity";
import { Circle } from "../../math/shape";
import { entitySpec } from "../entitySpec";

export class Tree extends Entity {
    shape = new Circle(entitySpec.DEFAULT_TREE_RADIUS);
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
