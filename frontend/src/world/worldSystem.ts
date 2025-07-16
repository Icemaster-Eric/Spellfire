import { System } from "../communication/system";
import {
    Collider,
    RenderData,
    shapeFromPacketEntityShape,
} from "../entities/entity";
import { getEntityConstructor } from "../entities/entityType";
import type { Connection } from "../multiplayer/connection";
import type { PacketEntity } from "../multiplayer/packets";
import type { World } from "./world";

export class WorldSystem extends System {
    world: World;
    constructor(world: World, connection: Connection) {
        super();
        this.world = world;
        connection.subscribeTo("event_initialize", (payload) => {
            this.world.initClientPlayer(payload.playerID);
        });
        connection.subscribeTo("entity_update", (payload) => {
            this.updateEntities(payload.entities);
        });
    }
    updateEntities(packetEntities: Array<PacketEntity>) {
        for (const packetEntity of packetEntities) {
            if (!this.world.entities.has(packetEntity.id)) {
                this.world.entities.set(
                    packetEntity.id,
                    new (getEntityConstructor(packetEntity.type))(
                        packetEntity.id,
                        new Collider(
                            packetEntity.collider.position,
                            packetEntity.collider.velocity,
                            shapeFromPacketEntityShape(
                                packetEntity.collider.shape,
                            ),
                            packetEntity.collider.rotation,
                        ),
                        new RenderData(),
                    ),
                );
            }
            this.world.entities
                .get(packetEntity.id)!
                .updateWithPacketEntity(packetEntity);
        }
    }
}
