import { aabb } from "../math/aabb";
import { vec2 } from "../math/vec2";
import type { PacketEntity } from "../multiplayer/packets";
import { StaticVelocity } from "../physics/velocity";
import type { Entity } from "./entity";
import { Rock } from "./environment/rock";
import { Tree } from "./environment/tree";
import { Player } from "./player";

export function entityFromPacketEntity(packetEntity: PacketEntity): Entity {
    let entity: Entity;
    switch (packetEntity.type) {
        case "player":
            entity = new Player(
                packetEntity.id,
                packetEntity.position
            );
            break;
        case "rock":
            entity = new Rock(
                packetEntity.id,
                packetEntity.position
            );
            break;
        case "tree":
            entity = new Tree(
                packetEntity.id,
                packetEntity.position
            );
            break;
    }
    return entity;
}
