import { Graphics } from "pixi.js";
import { Entity } from "../entity";
import { Circle } from "../../math/shape";
import { entitySpec } from "../entitySpec";

export class Bush extends Entity {
    shape = new Circle(entitySpec.DEFAULT_BUSH_RADIUS);
    sprite = bushSprite();
    updateSprite(): void {
        super.updateSprite();
    }
}
function bushSprite(): Graphics {
    const g = new Graphics();

    g.setStrokeStyle({ width: 0 });
    g.circle(0, 0, 50).fill("yellow");

    return g;
}
