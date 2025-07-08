import type { Container, Point, Rectangle } from "pixi.js";
import { vec2, type Vec2 } from "../lib/vec2";
import { aabb, type AABB } from "../lib/aabb";
import type { Velocity } from "../physics/velocity";

type Attributes = {
    doCSP: boolean;
};

abstract class Shape {
    abstract aabb(): AABB;
}
export abstract class Entity {
    id: number;
    // abstract boundingBox: Rectangle;

    /**
     * Width should be 100
     */
    abstract sprite: Container;
    updateSprite(): void {
        this.sprite.position.set(...this.position);
        const spriteSize = aabb.size(this.shape.aabb());
        this.sprite.setSize(...spriteSize);
        this.sprite.origin.set(...vec2.scale(spriteSize, .5));
        this.sprite.rotation = this.rotation;
    }
    velocity: Velocity;
    position: Vec2;
    shape: Shape;
    rotation: number;
    constructor(
        id: number,
        velocity: Velocity,
        position: Vec2,
        rotation: number,
        shape: Shape,
    ) {
        this.id = id;
        this.velocity = velocity;
        this.position = position;
        this.rotation = rotation;
        this.shape = shape;
    }
    //static attributes: Attributes;
}