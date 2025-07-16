import { System } from "../communication/system";
import { vec2, type Vec2 } from "../math/vec2";
import type { World } from "../world/world";
import { StaticVelocity } from "./velocity";

export class PhysicsSystem extends System {
    world: World;
    constructor(world: World) {
        super();
        this.world = world;
    }
    update(deltaMs: number) {
        for (const entity of this.world.entities.values()) {
            // TODO: add csp and whatever
            entity.localCollider = entity.trueCollider;

            vec2.add(
                entity.localCollider.position,
                entity.localCollider.velocity,
                entity.localCollider.position
            );
        }
    }
}