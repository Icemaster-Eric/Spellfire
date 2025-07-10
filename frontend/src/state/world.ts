import type { Entity } from "../entities/entity";
import type { Player } from "../entities/player";

export class World {
    entities?: Array<Entity>;
    clientPlayerId?: number;
    _isInitialized: boolean = false;
    isInitialized(): this is { entities: Array<Entity>, clientPlayerId: number } {
        return this._isInitialized;
    }
    initialize(entities: Array<Entity>, clientPlayerId: number) {
        this.entities = entities;
        this.clientPlayerId = clientPlayerId;
    }
    update(entities: Array<Entity>) {
        if (!this.isInitialized()) return;
        for (const entity of entities) {
            let entityToUpdateIdx = this.entities.findIndex((entity_) => entity_.id === entity.id);
            if (entityToUpdateIdx !== -1) {
                this.entities[entityToUpdateIdx] = entity;
            } else {
                this.entities.push(entity);
            }
        }
    }
    getClientPlayer(): Player {
        if (!this.isInitialized()) {
            throw new Error("World is not initialized.");
        }
        return this.entities.find((entity) => entity.id === this.clientPlayerId) as Player;
    }
    getEntity(entityId: number): Entity | undefined {
        if (!this.isInitialized()) {
            throw new Error("World is not initialized.");
        }
        return this.entities.find((entity) => entity.id === entityId);
    }
}
