import { vec2, type Vec2 } from "../math/vec2";
import { spellfire } from "./pb-spec";

export type PacketEntityType = "gunner" | "mage" | "rock" | "tree";

export type PacketEntity<T extends PacketEntityType = PacketEntityType> = {
    id: number;
    type: T;
    collider: PacketCollider;
    renderData: PacketRenderData;
    attributes: PacketEntityAttributes[T];
};

export type PacketCollider = {
    shape:
        | { type: "circle"; radius: number }
        | { type: "rect"; width: number; height: number };
    rotation: number;
    position: Vec2;
    velocity: Vec2;
};
export type PacketRenderData = {
    sprite: string;
};
export type PacketEntityAttributes = {
    gunner: {
        name: string;
    },
    mage: {
        name: string;
    },
    rock: {},
    tree: {}
};
type A = PacketEntityAttributes["gunner"]

export type ServerEvent = { type: "initialize", playerID: number };

export type ServerPacket = {
    timestamp: number;
    entities: PacketEntity[];
    events: ServerEvent[];
};

export type ClientEvent =
    | { type: "move"; movement: Vec2 };

export function clientEventToProtobufEvent(
    packet: ClientEvent,
): spellfire.ClientEvent {
    switch (packet.type) {
        case "move":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEventType.MOVE,
                movement: spellfire.Vec2.create(vec2.toPoint(packet.movement)),
            });
    }
}
export function serializeToClientPacket() {}
export function parseServerPacket(packetData: ArrayBuffer): ServerPacket {
    const serverProtobufPacket = spellfire.ServerPacket.decode(
        new Uint8Array(packetData),
    );
    const timestamp = serverProtobufPacket.timestamp!.ms! as number;
    const events: ServerEvent[] = serverProtobufPacket.events.map((serverProtobufEvent) => {
        switch (serverProtobufEvent.type!) {
            case spellfire.ServerEventType.SERVER_EVENT_TYPE_ENTER_GAME:
                return { type: "initialize", playerID: serverProtobufEvent.enterGamePlayerId! }
        }
        console.error("server event not matched");
        return null!;
    });
    const entities: PacketEntity[] = serverProtobufPacket.entities.map(
        (serverProtobufEntity) => {
            let specificEntityData: { [T in PacketEntityType]: { type: T, attributes: PacketEntityAttributes[T] } }[PacketEntityType]
            switch (serverProtobufEntity.type) {
                case spellfire.EntityType.ENTITY_TYPE_PLAYER_GUNNER:
                    specificEntityData = { type: "gunner", attributes: { name: "__no_name__" }}
                    for (const protobufEntityAttribute of serverProtobufEntity.attributes!) {
                        switch (protobufEntityAttribute.type) {
                            case spellfire.EntityAttributeType.ENTITY_ATTRIBUTE_TYPE_NAME:
                                specificEntityData.attributes.name = protobufEntityAttribute.name!;
                        }
                    }
                    
                    break;
                case spellfire.EntityType.ENTITY_TYPE_PLAYER_MAGE:
                    specificEntityData = { type: "mage", attributes: { name: "__no_name__" }}
                    for (const protobufEntityAttribute of serverProtobufEntity.attributes!) {
                        switch (protobufEntityAttribute.type) {
                            case spellfire.EntityAttributeType.ENTITY_ATTRIBUTE_TYPE_NAME:
                                specificEntityData.attributes.name = protobufEntityAttribute.name!;
                        }
                    }
                    break;
                
            }
            specificEntityData = specificEntityData!;
            return {
                id: serverProtobufEntity.id!,
                type: specificEntityData.type,
                collider: {
                    position: vec2(
                        serverProtobufEntity.collider!.position as {
                            x: number;
                            y: number;
                        },
                    ),
                    velocity: vec2(
                        serverProtobufEntity.collider!.position as {
                            x: number;
                            y: number;
                        },
                    ),
                    rotation: serverProtobufEntity.collider!.rotation!,
                    shape: match<
                        spellfire.ColliderType,
                        PacketCollider["shape"]
                    >(serverProtobufEntity.collider!.type!, [
                        [
                            spellfire.ColliderType.COLLIDER_TYPE_CIRCLE,
                            {
                                type: "circle",
                                radius: serverProtobufEntity.collider!.radius!,
                            },
                        ],
                        [
                            spellfire.ColliderType.COLLIDER_TYPE_RECT,
                            {
                                type: "rect",
                                width: serverProtobufEntity.collider!.width!,
                                height: serverProtobufEntity.collider!.height!,
                            },
                        ],
                    ])!,
                },
                renderData: {
                    sprite: ""
                },
                attributes: specificEntityData.attributes
            };
        },
    );
    return {
        timestamp,
        events,
        entities,
    };
}
function match<T, Output>(
    scruitinee: T,
    cases: Array<[T, Output]>,
): Output | undefined {
    for (const [caseMatchValue, caseOutput] of cases) {
        if (scruitinee === caseMatchValue) {
            return caseOutput;
        }
    }
    return undefined;
}
