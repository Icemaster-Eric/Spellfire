import { vec2, type Vec2 } from "../math/vec2";
import { spellfire } from "./pb-spec";

export type PacketEntityType = "gunner" | "mage" | "bush" | "rock" | "tree" | "bullet";

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
        health: number;
        gun: string;
    };
    mage: {
        name: string;
        health: number;
    };
    bush: {};
    rock: {};
    tree: {};
    bullet: {};
};

export type ServerEvent = { type: "initialize"; playerID: number };

export type ServerPacket = {
    timestamp: number;
    entities: PacketEntity[];
    events: ServerEvent[];
};

export type ClientEvent =
    | { type: "move"; movement: Vec2 }
    | { type: "start_fire" }
    | { type: "stop_fire" };

export function clientEventToProtobufEvent(
    packet: ClientEvent,
): spellfire.ClientEvent {
    switch (packet.type) {
        case "move":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEvent.ClientEventType.MOVE,
                movement: spellfire.Vec2.create(vec2.toPoint(packet.movement)),
            });
        case "start_fire":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEvent.ClientEventType.START_FIRE,
            });
        case "stop_fire":
            return spellfire.ClientEvent.create({
                type: spellfire.ClientEvent.ClientEventType.STOP_FIRE,
            });
    }
}
export function serializeToClientPacket() {}
export function parseServerPacket(packetData: ArrayBuffer): ServerPacket {
    const serverProtobufPacket = spellfire.ServerPacket.decode(
        new Uint8Array(packetData),
    );
    const timestamp = serverProtobufPacket.timestamp!.ms! as number;
    const events: ServerEvent[] = serverProtobufPacket.events.map(
        (serverProtobufEvent) => {
            switch (serverProtobufEvent.type!) {
                case spellfire.ServerEvent.ServerEventType.ENTER_GAME:
                    return {
                        type: "initialize",
                        playerID: serverProtobufEvent.enterGamePlayerId!,
                    };
            }
            console.error("server event not matched");
            return null!;
        },
    );
    const entities: PacketEntity[] = serverProtobufPacket.entities.map(
        (serverProtobufEntity) => {
            let specificEntityData: {
                [T in PacketEntityType]: {
                    type: T;
                    attributes: PacketEntityAttributes[T];
                };
            }[PacketEntityType];
            switch (serverProtobufEntity.type) {
                case spellfire.Entity.EntityType.GUNNER:
                    specificEntityData = {
                        type: "gunner",
                        attributes: { name: "__no_name__", gun: "", health: 0 },
                    };
                    for (const protobufEntityAttribute of serverProtobufEntity.attributes!) {
                        switch (protobufEntityAttribute.type) {
                            case spellfire.EntityAttribute.EntityAttributeType
                                .NAME:
                                specificEntityData.attributes.name =
                                    protobufEntityAttribute.name!;
                                break;
                            case spellfire.EntityAttribute.EntityAttributeType
                                .GUN:
                                switch (protobufEntityAttribute.gun!) {
                                    case spellfire.Gun.GUN_AUTOMATIC_RIFLE:
                                        specificEntityData.attributes.gun =
                                            "automatic_rifle";
                                }

                                break;
                            case spellfire.EntityAttribute.EntityAttributeType
                                .HEALTH:
                                specificEntityData.attributes.health =
                                    protobufEntityAttribute.health!;
                                break;
                        }
                    }

                    break;
                case spellfire.Entity.EntityType.MAGE:
                    specificEntityData = {
                        type: "mage",
                        attributes: { name: "__no_name__", health: 0 },
                    };
                    for (const protobufEntityAttribute of serverProtobufEntity.attributes!) {
                        switch (protobufEntityAttribute.type) {
                            case spellfire.EntityAttribute.EntityAttributeType
                                .NAME:
                                specificEntityData.attributes.name =
                                    protobufEntityAttribute.name!;
                                break;
                            case spellfire.EntityAttribute.EntityAttributeType
                                .GUN:
                                break;
                            case spellfire.EntityAttribute.EntityAttributeType
                                .HEALTH:
                                specificEntityData.attributes.health =
                                    protobufEntityAttribute.health!;
                                break;
                        }
                    }
                    break;

                case spellfire.Entity.EntityType.BUSH:
                    specificEntityData = { type: "bush", attributes: {} };
                    break;
                case spellfire.Entity.EntityType.ROCK:
                    specificEntityData = { type: "rock", attributes: {} };
                    break;
                case spellfire.Entity.EntityType.TREE:
                    specificEntityData = { type: "tree", attributes: {} };
                    break;
                case spellfire.Entity.EntityType.BULLET:
                    specificEntityData = { type: "bullet", attributes: {} };
                    break;
            }
            specificEntityData = specificEntityData!;
            let sprite: string = "";
            switch (serverProtobufEntity.renderData!.sprite) {
                case spellfire.Sprite.SPRITE_BULLET_1:
                    sprite = "bullet1.svg"
                    break;
                case spellfire.Sprite.SPRITE_ROCK_1:
                    sprite = "rock1.svg"
                    break;
                case spellfire.Sprite.SPRITE_ROCK_2:
                    sprite = "rock2.svg"
                    break;
                case spellfire.Sprite.SPRITE_ROCK_3:
                    sprite = "rock3.svg"
                    break;
                case spellfire.Sprite.SPRITE_ROCK_4:
                    sprite = "rock4.svg"
                    break;
                case spellfire.Sprite.SPRITE_TREE_1:
                    sprite = "tree1.svg"
                    break;
                case spellfire.Sprite.SPRITE_TREE_2:
                    sprite = "tree2.svg"
                    break;
                case spellfire.Sprite.SPRITE_BUSH_1:
                    sprite = "bush1.svg"
                    break;
                case spellfire.Sprite.SPRITE_PLAYER_GUNNER:
                    break;
            }
            
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
                        (serverProtobufEntity.collider!.velocity ?? {
                            x: 0,
                            y: 0,
                        }) as {
                            x: number;
                            y: number;
                        },
                    ),
                    rotation: serverProtobufEntity.collider!.rotation!,
                    shape: match<
                        spellfire.Collider.ColliderType,
                        PacketCollider["shape"]
                    >(serverProtobufEntity.collider!.type!, [
                        [
                            spellfire.Collider.ColliderType.CIRCLE,
                            () => ({
                                type: "circle",
                                radius: serverProtobufEntity.collider!.radius!,
                            }),
                        ],
                        [
                            spellfire.Collider.ColliderType.RECT,
                            () => ({
                                type: "rect",
                                width: serverProtobufEntity.collider!.size!.x!,
                                height: serverProtobufEntity.collider!.size!.y!,
                            }),
                        ],
                    ])!,
                },
                renderData: {
                    sprite,
                },
                attributes: specificEntityData.attributes,
                gun: serverProtobufEntity.attributes,
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
    cases: Array<[T, () => Output]>,
): Output | undefined {
    for (const [caseMatchValue, caseOutputFn] of cases) {
        if (scruitinee === caseMatchValue) {
            return caseOutputFn();
        }
    }
    return undefined;
}
