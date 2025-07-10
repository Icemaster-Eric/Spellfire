import { Graphics } from "pixi.js";
import { Entity } from "../entity";
import { entitySpec } from "../entitySpec";
import { Circle } from "../../math/shape";

export class Rock extends Entity {
    shape = new Circle(entitySpec.DEFAULT_ROCK_RADIUS);
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
