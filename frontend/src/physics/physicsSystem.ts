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
        if (!this.world.clientPlayerExists()) return;
        for (const entity of this.world.entities.values()) {
            let delta = vec2.scale(
                entity.currentLocalCollider.velocity,
                deltaMs / 1000,
            );
            vec2.add(
                entity.currentLocalCollider.position,
                delta,
                entity.currentLocalCollider.position,
            );
            // TODO: add csp and whatever
            //vec2.lerp(entity.localCollider.position, entity.trueCollider.position, .8)
            if (entity.id === this.world.clientPlayerID) {
            } else {
                entity.currentLocalCollider = entity.trueCollider;
            }
        }
    }
}
