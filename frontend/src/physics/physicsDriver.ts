import type { Vec2 } from "../lib/vec2";
import type { GameState } from "../state/gameState";
import { StaticVelocity } from "./velocity";

export class PhysicsDriver {
    gameStateRef: GameState;
    constructor(gameState: GameState) {
        this.gameStateRef = gameState;
    }
    setEntityVelocity(entityId: number, newVelocity: Vec2) {
        if (this.gameStateRef.world.isInitialized()) {
            let entity = this.gameStateRef.world.getEntity(entityId);
            if (entity) entity.velocity = new StaticVelocity(newVelocity); 
        }
    }
}