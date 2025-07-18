import { System } from "../communication/system";
import {
    Collider,
    RenderData,
    shapeFromPacketEntityShape,
} from "../entities/entity";
import { getEntityConstructor } from "../entities/entityType";
import { Player } from "../entities/player";
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
        const a = new Set();
        for (const packetEntity of packetEntities) {
            if (!this.world.entities.has(packetEntity.id)) {
                let entity = new (getEntityConstructor(packetEntity.type))(
                    packetEntity.id,
                    new Collider(
                        packetEntity.collider.position,
                        packetEntity.collider.velocity,
                        shapeFromPacketEntityShape(
                            packetEntity.collider.shape,
                        ),
                        packetEntity.collider.rotation,
                    ),
                    new RenderData(packetEntity.renderData.sprite),
                );
                if (entity instanceof Player) {
                    //@ts-ignore
                    entity.name = packetEntity.attributes.name;
                    //@ts-ignore
                    entity.health = packetEntity.attributes.health;
                }
                this.world.entities.set(
                    packetEntity.id,
                    entity,
                );
            }
            this.world.entities
                .get(packetEntity.id)!
                .updateWithPacketEntity(packetEntity);
            a.add(packetEntity.id)
        }
        this.world.entities.forEach((_, id) => {
            if (id === this.world.clientPlayerID) return;
            if (!a.has(id)) {
            	this.world.entities.get(id).sprite.destroy();
            	this.world.entities.delete(id);
            }
        })
    }
}
