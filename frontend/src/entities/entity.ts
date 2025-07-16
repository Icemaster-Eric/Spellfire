import { Container, type Point, type Rectangle } from "pixi.js";
import { vec2, type Vec2 } from "../math/vec2";
import { aabb, type AABB } from "../math/aabb";
import { StaticVelocity, type Velocity } from "../physics/velocity";
import type { PacketEntity } from "../multiplayer/packets";

type Attributes = {
    doCSP: boolean;
};

export type Shape =
    | { type: "circle"; radius: number }
    | { type: "rect"; size: Vec2 };

export function shapeFromPacketEntityShape(
    packetEntityShape: PacketEntity["collider"]["shape"],
): Shape {
    switch (packetEntityShape.type) {
        case "circle":
            return { type: "circle", radius: packetEntityShape.radius };
        case "rect":
            return {
                type: "rect",
                size: vec2(packetEntityShape.width, packetEntityShape.height),
            };
    }
}

const finalizationRegistry = new FinalizationRegistry<Container>((sprite) => {
    sprite.destroy({ children: true });
});

export abstract class Entity {
    id: number;
    /**
     * Width should be 100
     */
    sprite: Container;
    /**
     * Client size collider, succeptible to interpolation and prediction and may be outdated
     */
    localCollider: Collider;

    /**
     * The most up-to-date collider from the server, localCollider is trying to interpolate to match this
     */
    trueCollider: Collider;
    renderData: RenderData;
    updateSprite(): void {
        this.sprite.position.set(...this.localCollider.position);
        const spriteSize = this.localCollider.aabb().size;
        this.sprite.setSize(spriteSize[0] * 100, spriteSize[1] * 100);
        this.sprite.origin.set(...vec2.scale(spriteSize, 0.5));
        this.sprite.rotation = this.localCollider.rotation;
    }
    updateWithPacketEntity(packetEntity: PacketEntity) {
        this.trueCollider.position = packetEntity.collider.position;
        this.trueCollider.rotation = packetEntity.collider.rotation;
        this.trueCollider.shape = shapeFromPacketEntityShape(
            packetEntity.collider.shape,
        );
        this.trueCollider.velocity = packetEntity.collider.velocity;
    }
    constructor(
        id: number,
        initialCollider: Collider,
        renderData: RenderData,
        sprite: Container,
    ) {
        this.id = id;
        this.localCollider = this.trueCollider = initialCollider;
        this.renderData = renderData;
        this.sprite = sprite;
        finalizationRegistry.register(this, sprite);
    }
}

export type Meters = number & { readonly __is_meters: unique symbol };
export class RenderData {
    sprite: Container;
    width: Meters;
    height: Meters;
    constructor(sprite: Container, width: Meters, height: Meters) {
        this.sprite = sprite;
        this.width = width;
        this.height = height;
    }
}

export class Collider {
    position: Vec2;
    velocity: Vec2;
    shape: Shape;
    rotation: number;

    constructor(
        position: Vec2,
        velocity: Vec2,
        shape: Shape,
        rotation: number,
    ) {
        this.position = position;
        this.velocity = velocity;
        this.shape = shape;
        this.rotation = rotation;
    }

    aabb(): AABB {
        switch (this.shape.type) {
            case "circle":
                let radiusVec2 = vec2(this.shape.radius);
                return aabb(
                    vec2.subtract(this.position, radiusVec2, radiusVec2),
                    vec2(this.shape.radius * 2),
                );
            case "rect":
                return aabb(this.position, this.shape.size);
        }
    }
}
