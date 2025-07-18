import type { Entity } from "../entities/entity";
import type { Player } from "../entities/player";

export class World {
    entities: Map<number, Entity> = new Map();
    clientPlayerID: number | null = null;
    clientPlayerExists(): this is {
        clientPlayerID: number;
        getClientPlayer: () => Player;
    } {
        return this.clientPlayerID !== null;
    }
    constructor() {}
    getClientPlayer = () => {
        if (this.clientPlayerID !== null) {
            if (!this.entities.get(this.clientPlayerID))
                throw new Error(
                    "Client player ID exists but doesnt refer to anything",
                );
            return this.entities.get(this.clientPlayerID) as Player;
        }
        return null;
    };
    initClientPlayer(clientPlayerID: number) {
        this.clientPlayerID = clientPlayerID;
    }
}
