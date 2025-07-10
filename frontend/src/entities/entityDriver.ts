import { entityFromPacketEntity } from "../entities/parsePacketEntity";
import type { PacketEntity } from "../multiplayer/packets";
import type { GameState } from "../state/gameState";

export class EntityDriver {
    stateRef: GameState;
    constructor(state: GameState) {
        this.stateRef = state;
    }
    initializeWorld(packetEntities: Array<PacketEntity>, playerId: number) {
        const entities = packetEntities.map(entityFromPacketEntity);
        this.stateRef.world.initialize(entities, playerId);
    }
    updateWorld(packetEntities: Array<PacketEntity>) {
        const entities = packetEntities.map(entityFromPacketEntity);
        this.stateRef.world.update(entities);
    }
}