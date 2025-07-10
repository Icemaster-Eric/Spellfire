import type { Container, Point, Rectangle } from "pixi.js";
import { vec2, type Vec2 } from "../math/vec2";
import { aabb } from "../math/aabb";
import { StaticVelocity, type Velocity } from "../physics/velocity";
import type { Shape } from "../math/shape";

type Attributes = {
    doCSP: boolean;
};

export abstract class Entity {
    id: number;
    // abstract boundingBox: Rectangle;

    /**
     * Width should be 100
     */
    abstract sprite: Container;
    updateSprite(): void {
        this.sprite.position.set(...this.position);
        const spriteSize = aabb.size(this.shape.aabb(vec2(0)));
        this.sprite.setSize(...spriteSize);
        this.sprite.origin.set(...vec2.scale(spriteSize, 0.5));
        this.sprite.rotation = this.rotation;
    }
    velocity: Velocity = new StaticVelocity(vec2(0));
    position: Vec2;
    abstract shape: Shape;
    rotation: number = 0;
    constructor(
        id: number,
        position: Vec2,
    ) {
        this.id = id;
        this.position = position;
    }
    //static attributes: Attributes;
}
