import { vec2, type Vec2 } from "../math/vec2";
import { spellfire } from "./pb-spec";

export type PacketEntity = {
    id: number;
    type: "player" | "rock" | "tree";
    position: [number, number];
    rotation: number;
    shape: { type: "circle"; radius: number };
};

export type ServerEvent =
    | { type: "" }

export type ServerPacket = {
    timestamp: number,
    entities: PacketEntity[]
    events: ServerEvent[]
}

export type ClientEvent =
    | { type: "enter_game" }
    | { type: "move"; movement: Vec2 };

export function clientEventToProtobufEvent(
    packet: ClientEvent,
): spellfire.ClientEvent {
    switch (packet.type) {
        case "enter_game":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEventType.ENTER_GAME,
            });
        case "move":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEventType.MOVE,
                movement: spellfire.Vec2.create(vec2.toPoint(packet.movement)),
            });
    }
}
export function serializeToClientPacket() {

}
export function parseServerPacket(packetData: ArrayBuffer): ServerPacket {
    const serverProtobufPacket = spellfire.ServerPacket.decode(new Uint8Array(packetData));
    const timestamp = serverProtobufPacket.timestamp!.ms;
    const events = serverProtobufPacket.events.map((serverProtobufEvent) => {
        switch (serverProtobufEvent.type) {
            case spellfire.ServerEventType.SERVER_EVENT_TYPE_UNSPECIFIED:
                break;
        }
    })
    const entities: PacketEntity[] = serverProtobufPacket.entities.map((serverProtobufEntity) => {
        let entityType: PacketEntity["type"];
        switch (serverProtobufEntity.type) {
            case spellfire.EntityType.PLAYER:
                entityType = "player";
                break;
        }
        
        return {
            id: serverProtobufEntity.id!,
            type: entityType!,
            position: vec2(serverProtobufEntity.position as { x: number, y: number }),
            velocity: vec2(serverProtobufEntity.velocity as { x: number, y: number }),
            rotation: serverProtobufEntity.rotation!,
            shape: { type: "circle", radius: 5 }
        };
    })
    return {
        timestamp,
        events,
        entities
    }
}