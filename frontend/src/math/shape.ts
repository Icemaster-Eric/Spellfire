import { aabb, type AABB } from "./aabb";
import { vec2, type Vec2 } from "./vec2";

export abstract class Shape {
    /**
     * @param position Position of the center of the shape.
     */
    abstract aabb(position: Vec2): AABB;
}

export class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
    aabb(position: Vec2) {
        return aabb(vec2.subtract(position, vec2(this.radius)), vec2(this.radius * 2));
    }
}
export class Rect extends Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }
    aabb(position: Vec2) {
        return aabb(vec2.subtract(position, vec2.scale(vec2(this.width, this.height), .5)), vec2(this.width, this.height));
    }
}