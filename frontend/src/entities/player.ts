import { Graphics } from "pixi.js";
import { Entity } from "./entity";
import { Circle } from "../math/shape";
import { entitySpec } from "./entitySpec";

export class Player extends Entity {
    sprite = playerSprite();
    shape = new Circle(entitySpec.DEFAULT_PLAYER_RADIUS);
    updateSprite(): void {
        super.updateSprite();
    }
}
function playerSprite(): Graphics {
    const g = new Graphics();

    g.setStrokeStyle({ width: 10, color: "black" });
    g.circle(0, 0, 50).fill(0xffff99);

    g.setStrokeStyle({ width: 0 });
    g.circle(0, 0, 5).fill(0x000000);

    return g;
}
