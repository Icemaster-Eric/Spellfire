import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace spellfire. */
export namespace spellfire {

    /** ClientEventType enum. */
    enum ClientEventType {
        CLIENT_EVENT_TYPE_UNSPECIFIED = 0,
        ENTER_GAME = 1,
        MOVE = 2
    }

    /** Properties of a ClientEvent. */
    interface IClientEvent {

        /** ClientEvent type */
        type?: (spellfire.ClientEventType|null);

        /** ClientEvent movement */
        movement?: (spellfire.IVec2|null);
    }

    /** Represents a ClientEvent. */
    class ClientEvent implements IClientEvent {

        /**
         * Constructs a new ClientEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IClientEvent);

        /** ClientEvent type. */
        public type: spellfire.ClientEventType;

        /** ClientEvent movement. */
        public movement?: (spellfire.IVec2|null);

        /**
         * Creates a new ClientEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientEvent instance
         */
        public static create(properties?: spellfire.IClientEvent): spellfire.ClientEvent;

        /**
         * Encodes the specified ClientEvent message. Does not implicitly {@link spellfire.ClientEvent.verify|verify} messages.
         * @param message ClientEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IClientEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientEvent message, length delimited. Does not implicitly {@link spellfire.ClientEvent.verify|verify} messages.
         * @param message ClientEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IClientEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.ClientEvent;

        /**
         * Decodes a ClientEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.ClientEvent;

        /**
         * Verifies a ClientEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientEvent
         */
        public static fromObject(object: { [k: string]: any }): spellfire.ClientEvent;

        /**
         * Creates a plain object from a ClientEvent message. Also converts values to other types if specified.
         * @param message ClientEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.ClientEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientPacket. */
    interface IClientPacket {

        /** ClientPacket timestamp */
        timestamp?: (spellfire.ITimestamp|null);

        /** ClientPacket events */
        events?: (spellfire.IClientEvent[]|null);
    }

    /** Represents a ClientPacket. */
    class ClientPacket implements IClientPacket {

        /**
         * Constructs a new ClientPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IClientPacket);

        /** ClientPacket timestamp. */
        public timestamp?: (spellfire.ITimestamp|null);

        /** ClientPacket events. */
        public events: spellfire.IClientEvent[];

        /**
         * Creates a new ClientPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientPacket instance
         */
        public static create(properties?: spellfire.IClientPacket): spellfire.ClientPacket;

        /**
         * Encodes the specified ClientPacket message. Does not implicitly {@link spellfire.ClientPacket.verify|verify} messages.
         * @param message ClientPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IClientPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientPacket message, length delimited. Does not implicitly {@link spellfire.ClientPacket.verify|verify} messages.
         * @param message ClientPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IClientPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.ClientPacket;

        /**
         * Decodes a ClientPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.ClientPacket;

        /**
         * Verifies a ClientPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientPacket
         */
        public static fromObject(object: { [k: string]: any }): spellfire.ClientPacket;

        /**
         * Creates a plain object from a ClientPacket message. Also converts values to other types if specified.
         * @param message ClientPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.ClientPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientPacket
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Vec2. */
    interface IVec2 {

        /** Vec2 x */
        x?: (number|null);

        /** Vec2 y */
        y?: (number|null);
    }

    /** Represents a Vec2. */
    class Vec2 implements IVec2 {

        /**
         * Constructs a new Vec2.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IVec2);

        /** Vec2 x. */
        public x: number;

        /** Vec2 y. */
        public y: number;

        /**
         * Creates a new Vec2 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vec2 instance
         */
        public static create(properties?: spellfire.IVec2): spellfire.Vec2;

        /**
         * Encodes the specified Vec2 message. Does not implicitly {@link spellfire.Vec2.verify|verify} messages.
         * @param message Vec2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link spellfire.Vec2.verify|verify} messages.
         * @param message Vec2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IVec2, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vec2 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.Vec2;

        /**
         * Decodes a Vec2 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.Vec2;

        /**
         * Verifies a Vec2 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vec2
         */
        public static fromObject(object: { [k: string]: any }): spellfire.Vec2;

        /**
         * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
         * @param message Vec2
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.Vec2, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vec2 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Vec2
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Timestamp. */
    interface ITimestamp {

        /** Timestamp ms */
        ms?: (number|Long|null);
    }

    /** Represents a Timestamp. */
    class Timestamp implements ITimestamp {

        /**
         * Constructs a new Timestamp.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.ITimestamp);

        /** Timestamp ms. */
        public ms: (number|Long);

        /**
         * Creates a new Timestamp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Timestamp instance
         */
        public static create(properties?: spellfire.ITimestamp): spellfire.Timestamp;

        /**
         * Encodes the specified Timestamp message. Does not implicitly {@link spellfire.Timestamp.verify|verify} messages.
         * @param message Timestamp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link spellfire.Timestamp.verify|verify} messages.
         * @param message Timestamp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Timestamp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.Timestamp;

        /**
         * Decodes a Timestamp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.Timestamp;

        /**
         * Verifies a Timestamp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Timestamp
         */
        public static fromObject(object: { [k: string]: any }): spellfire.Timestamp;

        /**
         * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
         * @param message Timestamp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Timestamp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Timestamp
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** EntityType enum. */
    enum EntityType {
        ENTITY_TYPE_UNSPECIFIED = 0,
        PLAYER = 1
    }

    /** ColliderType enum. */
    enum ColliderType {
        COLLIDER_TYPE_UNSPECIFIED = 0,
        COLLIDER_TYPE_CIRCLE = 1,
        COLLIDER_TYPE_RECT = 2
    }

    /** Properties of a Collider. */
    interface ICollider {

        /** Collider type */
        type?: (spellfire.ColliderType|null);

        /** Collider rotation */
        rotation?: (number|null);

        /** Collider width */
        width?: (number|null);

        /** Collider height */
        height?: (number|null);

        /** Collider radius */
        radius?: (number|null);

        /** Collider position */
        position?: (spellfire.IVec2|null);

        /** Collider velocity */
        velocity?: (spellfire.IVec2|null);
    }

    /** Represents a Collider. */
    class Collider implements ICollider {

        /**
         * Constructs a new Collider.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.ICollider);

        /** Collider type. */
        public type: spellfire.ColliderType;

        /** Collider rotation. */
        public rotation: number;

        /** Collider width. */
        public width: number;

        /** Collider height. */
        public height: number;

        /** Collider radius. */
        public radius: number;

        /** Collider position. */
        public position?: (spellfire.IVec2|null);

        /** Collider velocity. */
        public velocity?: (spellfire.IVec2|null);

        /**
         * Creates a new Collider instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Collider instance
         */
        public static create(properties?: spellfire.ICollider): spellfire.Collider;

        /**
         * Encodes the specified Collider message. Does not implicitly {@link spellfire.Collider.verify|verify} messages.
         * @param message Collider message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.ICollider, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Collider message, length delimited. Does not implicitly {@link spellfire.Collider.verify|verify} messages.
         * @param message Collider message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.ICollider, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Collider message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Collider
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.Collider;

        /**
         * Decodes a Collider message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Collider
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.Collider;

        /**
         * Verifies a Collider message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Collider message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Collider
         */
        public static fromObject(object: { [k: string]: any }): spellfire.Collider;

        /**
         * Creates a plain object from a Collider message. Also converts values to other types if specified.
         * @param message Collider
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.Collider, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Collider to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Collider
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Sprite enum. */
    enum Sprite {
        SPRITE_NONE = 0,
        SPRITE_PLAYER = 1,
        SPRITE_BUSH = 2,
        SPRITE_TREE = 3,
        SPRITE_ROCK = 4
    }

    /** Properties of a RenderData. */
    interface IRenderData {

        /** RenderData sprite */
        sprite?: (spellfire.Sprite|null);
    }

    /** Represents a RenderData. */
    class RenderData implements IRenderData {

        /**
         * Constructs a new RenderData.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IRenderData);

        /** RenderData sprite. */
        public sprite: spellfire.Sprite;

        /**
         * Creates a new RenderData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RenderData instance
         */
        public static create(properties?: spellfire.IRenderData): spellfire.RenderData;

        /**
         * Encodes the specified RenderData message. Does not implicitly {@link spellfire.RenderData.verify|verify} messages.
         * @param message RenderData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IRenderData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RenderData message, length delimited. Does not implicitly {@link spellfire.RenderData.verify|verify} messages.
         * @param message RenderData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IRenderData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RenderData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RenderData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.RenderData;

        /**
         * Decodes a RenderData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RenderData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.RenderData;

        /**
         * Verifies a RenderData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RenderData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RenderData
         */
        public static fromObject(object: { [k: string]: any }): spellfire.RenderData;

        /**
         * Creates a plain object from a RenderData message. Also converts values to other types if specified.
         * @param message RenderData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.RenderData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RenderData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RenderData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** EntityMode enum. */
    enum EntityMode {
        ENTITY_MODE_DEFAULT = 0,
        ENTITY_MODE_PLAYER_WIELDING_PRIMARY_GUN = 1,
        ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_1 = 2,
        ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_2 = 3,
        ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_3 = 4,
        ENTITY_MODE_PLAYER_RELOADING = 5,
        ENTITY_MODE_BUSH_SHAKING = 6
    }

    /** Gun enum. */
    enum Gun {
        GUN_UNSPECIFIED = 0,
        GUN_AK47 = 1,
        GUN_M4 = 2
    }

    /** Properties of a PlayerState. */
    interface IPlayerState {

        /** PlayerState playerGun */
        playerGun?: (spellfire.Gun|null);
    }

    /** Represents a PlayerState. */
    class PlayerState implements IPlayerState {

        /**
         * Constructs a new PlayerState.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IPlayerState);

        /** PlayerState playerGun. */
        public playerGun: spellfire.Gun;

        /**
         * Creates a new PlayerState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerState instance
         */
        public static create(properties?: spellfire.IPlayerState): spellfire.PlayerState;

        /**
         * Encodes the specified PlayerState message. Does not implicitly {@link spellfire.PlayerState.verify|verify} messages.
         * @param message PlayerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IPlayerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerState message, length delimited. Does not implicitly {@link spellfire.PlayerState.verify|verify} messages.
         * @param message PlayerState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IPlayerState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.PlayerState;

        /**
         * Decodes a PlayerState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.PlayerState;

        /**
         * Verifies a PlayerState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerState
         */
        public static fromObject(object: { [k: string]: any }): spellfire.PlayerState;

        /**
         * Creates a plain object from a PlayerState message. Also converts values to other types if specified.
         * @param message PlayerState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.PlayerState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EntityState. */
    interface IEntityState {

        /** EntityState playerState */
        playerState?: (spellfire.IPlayerState|null);
    }

    /** Represents an EntityState. */
    class EntityState implements IEntityState {

        /**
         * Constructs a new EntityState.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IEntityState);

        /** EntityState playerState. */
        public playerState?: (spellfire.IPlayerState|null);

        /**
         * Creates a new EntityState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityState instance
         */
        public static create(properties?: spellfire.IEntityState): spellfire.EntityState;

        /**
         * Encodes the specified EntityState message. Does not implicitly {@link spellfire.EntityState.verify|verify} messages.
         * @param message EntityState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IEntityState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EntityState message, length delimited. Does not implicitly {@link spellfire.EntityState.verify|verify} messages.
         * @param message EntityState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IEntityState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EntityState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.EntityState;

        /**
         * Decodes an EntityState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.EntityState;

        /**
         * Verifies an EntityState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityState
         */
        public static fromObject(object: { [k: string]: any }): spellfire.EntityState;

        /**
         * Creates a plain object from an EntityState message. Also converts values to other types if specified.
         * @param message EntityState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.EntityState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EntityState
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Entity. */
    interface IEntity {

        /** Entity id */
        id?: (number|null);

        /** Entity type */
        type?: (spellfire.EntityType|null);

        /** Entity collider */
        collider?: (spellfire.ICollider|null);

        /** Entity renderData */
        renderData?: (spellfire.IRenderData|null);

        /** Entity state */
        state?: (spellfire.IEntityState|null);
    }

    /** Represents an Entity. */
    class Entity implements IEntity {

        /**
         * Constructs a new Entity.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IEntity);

        /** Entity id. */
        public id: number;

        /** Entity type. */
        public type: spellfire.EntityType;

        /** Entity collider. */
        public collider?: (spellfire.ICollider|null);

        /** Entity renderData. */
        public renderData?: (spellfire.IRenderData|null);

        /** Entity state. */
        public state?: (spellfire.IEntityState|null);

        /**
         * Creates a new Entity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Entity instance
         */
        public static create(properties?: spellfire.IEntity): spellfire.Entity;

        /**
         * Encodes the specified Entity message. Does not implicitly {@link spellfire.Entity.verify|verify} messages.
         * @param message Entity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Entity message, length delimited. Does not implicitly {@link spellfire.Entity.verify|verify} messages.
         * @param message Entity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Entity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.Entity;

        /**
         * Decodes an Entity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.Entity;

        /**
         * Verifies an Entity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Entity
         */
        public static fromObject(object: { [k: string]: any }): spellfire.Entity;

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @param message Entity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.Entity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Entity
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ServerEventType enum. */
    enum ServerEventType {
        SERVER_EVENT_TYPE_UNSPECIFIED = 0
    }

    /** Properties of a ServerEvent. */
    interface IServerEvent {

        /** ServerEvent type */
        type?: (spellfire.ServerEventType|null);
    }

    /** Represents a ServerEvent. */
    class ServerEvent implements IServerEvent {

        /**
         * Constructs a new ServerEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IServerEvent);

        /** ServerEvent type. */
        public type: spellfire.ServerEventType;

        /**
         * Creates a new ServerEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerEvent instance
         */
        public static create(properties?: spellfire.IServerEvent): spellfire.ServerEvent;

        /**
         * Encodes the specified ServerEvent message. Does not implicitly {@link spellfire.ServerEvent.verify|verify} messages.
         * @param message ServerEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IServerEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerEvent message, length delimited. Does not implicitly {@link spellfire.ServerEvent.verify|verify} messages.
         * @param message ServerEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IServerEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.ServerEvent;

        /**
         * Decodes a ServerEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.ServerEvent;

        /**
         * Verifies a ServerEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerEvent
         */
        public static fromObject(object: { [k: string]: any }): spellfire.ServerEvent;

        /**
         * Creates a plain object from a ServerEvent message. Also converts values to other types if specified.
         * @param message ServerEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.ServerEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ServerEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ServerPacket. */
    interface IServerPacket {

        /** ServerPacket timestamp */
        timestamp?: (spellfire.ITimestamp|null);

        /** ServerPacket entities */
        entities?: (spellfire.IEntity[]|null);

        /** ServerPacket events */
        events?: (spellfire.IServerEvent[]|null);
    }

    /** Represents a ServerPacket. */
    class ServerPacket implements IServerPacket {

        /**
         * Constructs a new ServerPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: spellfire.IServerPacket);

        /** ServerPacket timestamp. */
        public timestamp?: (spellfire.ITimestamp|null);

        /** ServerPacket entities. */
        public entities: spellfire.IEntity[];

        /** ServerPacket events. */
        public events: spellfire.IServerEvent[];

        /**
         * Creates a new ServerPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerPacket instance
         */
        public static create(properties?: spellfire.IServerPacket): spellfire.ServerPacket;

        /**
         * Encodes the specified ServerPacket message. Does not implicitly {@link spellfire.ServerPacket.verify|verify} messages.
         * @param message ServerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spellfire.IServerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerPacket message, length delimited. Does not implicitly {@link spellfire.ServerPacket.verify|verify} messages.
         * @param message ServerPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spellfire.IServerPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spellfire.ServerPacket;

        /**
         * Decodes a ServerPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spellfire.ServerPacket;

        /**
         * Verifies a ServerPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerPacket
         */
        public static fromObject(object: { [k: string]: any }): spellfire.ServerPacket;

        /**
         * Creates a plain object from a ServerPacket message. Also converts values to other types if specified.
         * @param message ServerPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spellfire.ServerPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ServerPacket
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
