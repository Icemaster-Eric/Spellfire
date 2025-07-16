import { aabb } from "../math/aabb";
import { vec2 } from "../math/vec2";
import type { PacketEntity } from "../multiplayer/packets";
import { StaticVelocity } from "../physics/velocity";
import { Entity, type Collider, type RenderData } from "./entity";
import { Bush } from "./environment/bush";
import { Rock } from "./environment/rock";
import { Tree } from "./environment/tree";
import { Player } from "./player";

const entityConstructorMap = {
    gunner: Player,
    mage: Player,
    rock: Rock,
    tree: Tree,
    bush: Bush
} as const;

export function getEntityConstructor<K extends keyof typeof entityConstructorMap>(
    entityType: K,
): (typeof entityConstructorMap)[K] {
    let entityConstructor = entityConstructorMap[entityType];
    if (!entityConstructor) {
        throw new Error("Entity type " + entityType + " not recognized");
    }
    return entityConstructor;
}
