/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const spellfire = $root.spellfire = (() => {

    /**
     * Namespace spellfire.
     * @exports spellfire
     * @namespace
     */
    const spellfire = {};

    /**
     * ClientEventType enum.
     * @name spellfire.ClientEventType
     * @enum {number}
     * @property {number} CLIENT_EVENT_TYPE_UNSPECIFIED=0 CLIENT_EVENT_TYPE_UNSPECIFIED value
     * @property {number} ENTER_GAME=1 ENTER_GAME value
     * @property {number} MOVE=2 MOVE value
     */
    spellfire.ClientEventType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CLIENT_EVENT_TYPE_UNSPECIFIED"] = 0;
        values[valuesById[1] = "ENTER_GAME"] = 1;
        values[valuesById[2] = "MOVE"] = 2;
        return values;
    })();

    spellfire.ClientEvent = (function() {

        /**
         * Properties of a ClientEvent.
         * @memberof spellfire
         * @interface IClientEvent
         * @property {spellfire.ClientEventType|null} [type] ClientEvent type
         * @property {spellfire.IVec2|null} [movement] ClientEvent movement
         */

        /**
         * Constructs a new ClientEvent.
         * @memberof spellfire
         * @classdesc Represents a ClientEvent.
         * @implements IClientEvent
         * @constructor
         * @param {spellfire.IClientEvent=} [properties] Properties to set
         */
        function ClientEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientEvent type.
         * @member {spellfire.ClientEventType} type
         * @memberof spellfire.ClientEvent
         * @instance
         */
        ClientEvent.prototype.type = 0;

        /**
         * ClientEvent movement.
         * @member {spellfire.IVec2|null|undefined} movement
         * @memberof spellfire.ClientEvent
         * @instance
         */
        ClientEvent.prototype.movement = null;

        /**
         * Creates a new ClientEvent instance using the specified properties.
         * @function create
         * @memberof spellfire.ClientEvent
         * @static
         * @param {spellfire.IClientEvent=} [properties] Properties to set
         * @returns {spellfire.ClientEvent} ClientEvent instance
         */
        ClientEvent.create = function create(properties) {
            return new ClientEvent(properties);
        };

        /**
         * Encodes the specified ClientEvent message. Does not implicitly {@link spellfire.ClientEvent.verify|verify} messages.
         * @function encode
         * @memberof spellfire.ClientEvent
         * @static
         * @param {spellfire.IClientEvent} message ClientEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.movement != null && Object.hasOwnProperty.call(message, "movement"))
                $root.spellfire.Vec2.encode(message.movement, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientEvent message, length delimited. Does not implicitly {@link spellfire.ClientEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.ClientEvent
         * @static
         * @param {spellfire.IClientEvent} message ClientEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientEvent message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.ClientEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.ClientEvent} ClientEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientEvent.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.ClientEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.movement = $root.spellfire.Vec2.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.ClientEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.ClientEvent} ClientEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientEvent message.
         * @function verify
         * @memberof spellfire.ClientEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.movement != null && message.hasOwnProperty("movement")) {
                let error = $root.spellfire.Vec2.verify(message.movement);
                if (error)
                    return "movement." + error;
            }
            return null;
        };

        /**
         * Creates a ClientEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.ClientEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.ClientEvent} ClientEvent
         */
        ClientEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.ClientEvent)
                return object;
            let message = new $root.spellfire.ClientEvent();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "CLIENT_EVENT_TYPE_UNSPECIFIED":
            case 0:
                message.type = 0;
                break;
            case "ENTER_GAME":
            case 1:
                message.type = 1;
                break;
            case "MOVE":
            case 2:
                message.type = 2;
                break;
            }
            if (object.movement != null) {
                if (typeof object.movement !== "object")
                    throw TypeError(".spellfire.ClientEvent.movement: object expected");
                message.movement = $root.spellfire.Vec2.fromObject(object.movement);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.ClientEvent
         * @static
         * @param {spellfire.ClientEvent} message ClientEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "CLIENT_EVENT_TYPE_UNSPECIFIED" : 0;
                object.movement = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.spellfire.ClientEventType[message.type] === undefined ? message.type : $root.spellfire.ClientEventType[message.type] : message.type;
            if (message.movement != null && message.hasOwnProperty("movement"))
                object.movement = $root.spellfire.Vec2.toObject(message.movement, options);
            return object;
        };

        /**
         * Converts this ClientEvent to JSON.
         * @function toJSON
         * @memberof spellfire.ClientEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientEvent
         * @function getTypeUrl
         * @memberof spellfire.ClientEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.ClientEvent";
        };

        return ClientEvent;
    })();

    spellfire.ClientPacket = (function() {

        /**
         * Properties of a ClientPacket.
         * @memberof spellfire
         * @interface IClientPacket
         * @property {spellfire.ITimestamp|null} [timestamp] ClientPacket timestamp
         * @property {Array.<spellfire.IClientEvent>|null} [events] ClientPacket events
         */

        /**
         * Constructs a new ClientPacket.
         * @memberof spellfire
         * @classdesc Represents a ClientPacket.
         * @implements IClientPacket
         * @constructor
         * @param {spellfire.IClientPacket=} [properties] Properties to set
         */
        function ClientPacket(properties) {
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientPacket timestamp.
         * @member {spellfire.ITimestamp|null|undefined} timestamp
         * @memberof spellfire.ClientPacket
         * @instance
         */
        ClientPacket.prototype.timestamp = null;

        /**
         * ClientPacket events.
         * @member {Array.<spellfire.IClientEvent>} events
         * @memberof spellfire.ClientPacket
         * @instance
         */
        ClientPacket.prototype.events = $util.emptyArray;

        /**
         * Creates a new ClientPacket instance using the specified properties.
         * @function create
         * @memberof spellfire.ClientPacket
         * @static
         * @param {spellfire.IClientPacket=} [properties] Properties to set
         * @returns {spellfire.ClientPacket} ClientPacket instance
         */
        ClientPacket.create = function create(properties) {
            return new ClientPacket(properties);
        };

        /**
         * Encodes the specified ClientPacket message. Does not implicitly {@link spellfire.ClientPacket.verify|verify} messages.
         * @function encode
         * @memberof spellfire.ClientPacket
         * @static
         * @param {spellfire.IClientPacket} message ClientPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientPacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                $root.spellfire.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.spellfire.ClientEvent.encode(message.events[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientPacket message, length delimited. Does not implicitly {@link spellfire.ClientPacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.ClientPacket
         * @static
         * @param {spellfire.IClientPacket} message ClientPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientPacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientPacket message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.ClientPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.ClientPacket} ClientPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientPacket.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.ClientPacket();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = $root.spellfire.Timestamp.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.spellfire.ClientEvent.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientPacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.ClientPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.ClientPacket} ClientPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientPacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientPacket message.
         * @function verify
         * @memberof spellfire.ClientPacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientPacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                let error = $root.spellfire.Timestamp.verify(message.timestamp);
                if (error)
                    return "timestamp." + error;
            }
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.spellfire.ClientEvent.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClientPacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.ClientPacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.ClientPacket} ClientPacket
         */
        ClientPacket.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.ClientPacket)
                return object;
            let message = new $root.spellfire.ClientPacket();
            if (object.timestamp != null) {
                if (typeof object.timestamp !== "object")
                    throw TypeError(".spellfire.ClientPacket.timestamp: object expected");
                message.timestamp = $root.spellfire.Timestamp.fromObject(object.timestamp);
            }
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".spellfire.ClientPacket.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".spellfire.ClientPacket.events: object expected");
                    message.events[i] = $root.spellfire.ClientEvent.fromObject(object.events[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientPacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.ClientPacket
         * @static
         * @param {spellfire.ClientPacket} message ClientPacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientPacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (options.defaults)
                object.timestamp = null;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = $root.spellfire.Timestamp.toObject(message.timestamp, options);
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.spellfire.ClientEvent.toObject(message.events[j], options);
            }
            return object;
        };

        /**
         * Converts this ClientPacket to JSON.
         * @function toJSON
         * @memberof spellfire.ClientPacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientPacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientPacket
         * @function getTypeUrl
         * @memberof spellfire.ClientPacket
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientPacket.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.ClientPacket";
        };

        return ClientPacket;
    })();

    spellfire.Vec2 = (function() {

        /**
         * Properties of a Vec2.
         * @memberof spellfire
         * @interface IVec2
         * @property {number|null} [x] Vec2 x
         * @property {number|null} [y] Vec2 y
         */

        /**
         * Constructs a new Vec2.
         * @memberof spellfire
         * @classdesc Represents a Vec2.
         * @implements IVec2
         * @constructor
         * @param {spellfire.IVec2=} [properties] Properties to set
         */
        function Vec2(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vec2 x.
         * @member {number} x
         * @memberof spellfire.Vec2
         * @instance
         */
        Vec2.prototype.x = 0;

        /**
         * Vec2 y.
         * @member {number} y
         * @memberof spellfire.Vec2
         * @instance
         */
        Vec2.prototype.y = 0;

        /**
         * Creates a new Vec2 instance using the specified properties.
         * @function create
         * @memberof spellfire.Vec2
         * @static
         * @param {spellfire.IVec2=} [properties] Properties to set
         * @returns {spellfire.Vec2} Vec2 instance
         */
        Vec2.create = function create(properties) {
            return new Vec2(properties);
        };

        /**
         * Encodes the specified Vec2 message. Does not implicitly {@link spellfire.Vec2.verify|verify} messages.
         * @function encode
         * @memberof spellfire.Vec2
         * @static
         * @param {spellfire.IVec2} message Vec2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec2.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.y);
            return writer;
        };

        /**
         * Encodes the specified Vec2 message, length delimited. Does not implicitly {@link spellfire.Vec2.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.Vec2
         * @static
         * @param {spellfire.IVec2} message Vec2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vec2.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vec2 message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.Vec2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.Vec2} Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec2.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.Vec2();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.double();
                        break;
                    }
                case 2: {
                        message.y = reader.double();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vec2 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.Vec2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.Vec2} Vec2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vec2.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vec2 message.
         * @function verify
         * @memberof spellfire.Vec2
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vec2.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            return null;
        };

        /**
         * Creates a Vec2 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.Vec2
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.Vec2} Vec2
         */
        Vec2.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.Vec2)
                return object;
            let message = new $root.spellfire.Vec2();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            return message;
        };

        /**
         * Creates a plain object from a Vec2 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.Vec2
         * @static
         * @param {spellfire.Vec2} message Vec2
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vec2.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            return object;
        };

        /**
         * Converts this Vec2 to JSON.
         * @function toJSON
         * @memberof spellfire.Vec2
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vec2.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vec2
         * @function getTypeUrl
         * @memberof spellfire.Vec2
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vec2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.Vec2";
        };

        return Vec2;
    })();

    spellfire.Timestamp = (function() {

        /**
         * Properties of a Timestamp.
         * @memberof spellfire
         * @interface ITimestamp
         * @property {number|Long|null} [ms] Timestamp ms
         */

        /**
         * Constructs a new Timestamp.
         * @memberof spellfire
         * @classdesc Represents a Timestamp.
         * @implements ITimestamp
         * @constructor
         * @param {spellfire.ITimestamp=} [properties] Properties to set
         */
        function Timestamp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Timestamp ms.
         * @member {number|Long} ms
         * @memberof spellfire.Timestamp
         * @instance
         */
        Timestamp.prototype.ms = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Timestamp instance using the specified properties.
         * @function create
         * @memberof spellfire.Timestamp
         * @static
         * @param {spellfire.ITimestamp=} [properties] Properties to set
         * @returns {spellfire.Timestamp} Timestamp instance
         */
        Timestamp.create = function create(properties) {
            return new Timestamp(properties);
        };

        /**
         * Encodes the specified Timestamp message. Does not implicitly {@link spellfire.Timestamp.verify|verify} messages.
         * @function encode
         * @memberof spellfire.Timestamp
         * @static
         * @param {spellfire.ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ms != null && Object.hasOwnProperty.call(message, "ms"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ms);
            return writer;
        };

        /**
         * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link spellfire.Timestamp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.Timestamp
         * @static
         * @param {spellfire.ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Timestamp message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.Timestamp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ms = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Timestamp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Timestamp message.
         * @function verify
         * @memberof spellfire.Timestamp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Timestamp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ms != null && message.hasOwnProperty("ms"))
                if (!$util.isInteger(message.ms) && !(message.ms && $util.isInteger(message.ms.low) && $util.isInteger(message.ms.high)))
                    return "ms: integer|Long expected";
            return null;
        };

        /**
         * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.Timestamp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.Timestamp} Timestamp
         */
        Timestamp.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.Timestamp)
                return object;
            let message = new $root.spellfire.Timestamp();
            if (object.ms != null)
                if ($util.Long)
                    (message.ms = $util.Long.fromValue(object.ms)).unsigned = true;
                else if (typeof object.ms === "string")
                    message.ms = parseInt(object.ms, 10);
                else if (typeof object.ms === "number")
                    message.ms = object.ms;
                else if (typeof object.ms === "object")
                    message.ms = new $util.LongBits(object.ms.low >>> 0, object.ms.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.Timestamp
         * @static
         * @param {spellfire.Timestamp} message Timestamp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Timestamp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ms = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ms = options.longs === String ? "0" : 0;
            if (message.ms != null && message.hasOwnProperty("ms"))
                if (typeof message.ms === "number")
                    object.ms = options.longs === String ? String(message.ms) : message.ms;
                else
                    object.ms = options.longs === String ? $util.Long.prototype.toString.call(message.ms) : options.longs === Number ? new $util.LongBits(message.ms.low >>> 0, message.ms.high >>> 0).toNumber(true) : message.ms;
            return object;
        };

        /**
         * Converts this Timestamp to JSON.
         * @function toJSON
         * @memberof spellfire.Timestamp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Timestamp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Timestamp
         * @function getTypeUrl
         * @memberof spellfire.Timestamp
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.Timestamp";
        };

        return Timestamp;
    })();

    /**
     * EntityType enum.
     * @name spellfire.EntityType
     * @enum {number}
     * @property {number} ENTITY_TYPE_UNSPECIFIED=0 ENTITY_TYPE_UNSPECIFIED value
     * @property {number} PLAYER=1 PLAYER value
     */
    spellfire.EntityType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENTITY_TYPE_UNSPECIFIED"] = 0;
        values[valuesById[1] = "PLAYER"] = 1;
        return values;
    })();

    /**
     * ColliderType enum.
     * @name spellfire.ColliderType
     * @enum {number}
     * @property {number} COLLIDER_TYPE_UNSPECIFIED=0 COLLIDER_TYPE_UNSPECIFIED value
     * @property {number} COLLIDER_TYPE_CIRCLE=1 COLLIDER_TYPE_CIRCLE value
     * @property {number} COLLIDER_TYPE_RECT=2 COLLIDER_TYPE_RECT value
     */
    spellfire.ColliderType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "COLLIDER_TYPE_UNSPECIFIED"] = 0;
        values[valuesById[1] = "COLLIDER_TYPE_CIRCLE"] = 1;
        values[valuesById[2] = "COLLIDER_TYPE_RECT"] = 2;
        return values;
    })();

    spellfire.Collider = (function() {

        /**
         * Properties of a Collider.
         * @memberof spellfire
         * @interface ICollider
         * @property {spellfire.ColliderType|null} [type] Collider type
         * @property {number|null} [rotation] Collider rotation
         * @property {number|null} [width] Collider width
         * @property {number|null} [height] Collider height
         * @property {number|null} [radius] Collider radius
         * @property {spellfire.IVec2|null} [position] Collider position
         * @property {spellfire.IVec2|null} [velocity] Collider velocity
         */

        /**
         * Constructs a new Collider.
         * @memberof spellfire
         * @classdesc Represents a Collider.
         * @implements ICollider
         * @constructor
         * @param {spellfire.ICollider=} [properties] Properties to set
         */
        function Collider(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Collider type.
         * @member {spellfire.ColliderType} type
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.type = 0;

        /**
         * Collider rotation.
         * @member {number} rotation
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.rotation = 0;

        /**
         * Collider width.
         * @member {number} width
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.width = 0;

        /**
         * Collider height.
         * @member {number} height
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.height = 0;

        /**
         * Collider radius.
         * @member {number} radius
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.radius = 0;

        /**
         * Collider position.
         * @member {spellfire.IVec2|null|undefined} position
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.position = null;

        /**
         * Collider velocity.
         * @member {spellfire.IVec2|null|undefined} velocity
         * @memberof spellfire.Collider
         * @instance
         */
        Collider.prototype.velocity = null;

        /**
         * Creates a new Collider instance using the specified properties.
         * @function create
         * @memberof spellfire.Collider
         * @static
         * @param {spellfire.ICollider=} [properties] Properties to set
         * @returns {spellfire.Collider} Collider instance
         */
        Collider.create = function create(properties) {
            return new Collider(properties);
        };

        /**
         * Encodes the specified Collider message. Does not implicitly {@link spellfire.Collider.verify|verify} messages.
         * @function encode
         * @memberof spellfire.Collider
         * @static
         * @param {spellfire.ICollider} message Collider message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Collider.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.rotation);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.height);
            if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.radius);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.spellfire.Vec2.encode(message.position, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                $root.spellfire.Vec2.encode(message.velocity, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Collider message, length delimited. Does not implicitly {@link spellfire.Collider.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.Collider
         * @static
         * @param {spellfire.ICollider} message Collider message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Collider.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Collider message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.Collider
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.Collider} Collider
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Collider.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.Collider();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.rotation = reader.double();
                        break;
                    }
                case 3: {
                        message.width = reader.double();
                        break;
                    }
                case 4: {
                        message.height = reader.double();
                        break;
                    }
                case 5: {
                        message.radius = reader.double();
                        break;
                    }
                case 6: {
                        message.position = $root.spellfire.Vec2.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.velocity = $root.spellfire.Vec2.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Collider message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.Collider
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.Collider} Collider
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Collider.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Collider message.
         * @function verify
         * @memberof spellfire.Collider
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Collider.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                if (typeof message.rotation !== "number")
                    return "rotation: number expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (typeof message.width !== "number")
                    return "width: number expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (typeof message.height !== "number")
                    return "height: number expected";
            if (message.radius != null && message.hasOwnProperty("radius"))
                if (typeof message.radius !== "number")
                    return "radius: number expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.spellfire.Vec2.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.velocity != null && message.hasOwnProperty("velocity")) {
                let error = $root.spellfire.Vec2.verify(message.velocity);
                if (error)
                    return "velocity." + error;
            }
            return null;
        };

        /**
         * Creates a Collider message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.Collider
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.Collider} Collider
         */
        Collider.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.Collider)
                return object;
            let message = new $root.spellfire.Collider();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "COLLIDER_TYPE_UNSPECIFIED":
            case 0:
                message.type = 0;
                break;
            case "COLLIDER_TYPE_CIRCLE":
            case 1:
                message.type = 1;
                break;
            case "COLLIDER_TYPE_RECT":
            case 2:
                message.type = 2;
                break;
            }
            if (object.rotation != null)
                message.rotation = Number(object.rotation);
            if (object.width != null)
                message.width = Number(object.width);
            if (object.height != null)
                message.height = Number(object.height);
            if (object.radius != null)
                message.radius = Number(object.radius);
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".spellfire.Collider.position: object expected");
                message.position = $root.spellfire.Vec2.fromObject(object.position);
            }
            if (object.velocity != null) {
                if (typeof object.velocity !== "object")
                    throw TypeError(".spellfire.Collider.velocity: object expected");
                message.velocity = $root.spellfire.Vec2.fromObject(object.velocity);
            }
            return message;
        };

        /**
         * Creates a plain object from a Collider message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.Collider
         * @static
         * @param {spellfire.Collider} message Collider
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Collider.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "COLLIDER_TYPE_UNSPECIFIED" : 0;
                object.rotation = 0;
                object.width = 0;
                object.height = 0;
                object.radius = 0;
                object.position = null;
                object.velocity = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.spellfire.ColliderType[message.type] === undefined ? message.type : $root.spellfire.ColliderType[message.type] : message.type;
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = options.json && !isFinite(message.rotation) ? String(message.rotation) : message.rotation;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = options.json && !isFinite(message.width) ? String(message.width) : message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = options.json && !isFinite(message.height) ? String(message.height) : message.height;
            if (message.radius != null && message.hasOwnProperty("radius"))
                object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.spellfire.Vec2.toObject(message.position, options);
            if (message.velocity != null && message.hasOwnProperty("velocity"))
                object.velocity = $root.spellfire.Vec2.toObject(message.velocity, options);
            return object;
        };

        /**
         * Converts this Collider to JSON.
         * @function toJSON
         * @memberof spellfire.Collider
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Collider.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Collider
         * @function getTypeUrl
         * @memberof spellfire.Collider
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Collider.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.Collider";
        };

        return Collider;
    })();

    /**
     * Sprite enum.
     * @name spellfire.Sprite
     * @enum {number}
     * @property {number} SPRITE_NONE=0 SPRITE_NONE value
     * @property {number} SPRITE_PLAYER=1 SPRITE_PLAYER value
     * @property {number} SPRITE_BUSH=2 SPRITE_BUSH value
     * @property {number} SPRITE_TREE=3 SPRITE_TREE value
     * @property {number} SPRITE_ROCK=4 SPRITE_ROCK value
     */
    spellfire.Sprite = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SPRITE_NONE"] = 0;
        values[valuesById[1] = "SPRITE_PLAYER"] = 1;
        values[valuesById[2] = "SPRITE_BUSH"] = 2;
        values[valuesById[3] = "SPRITE_TREE"] = 3;
        values[valuesById[4] = "SPRITE_ROCK"] = 4;
        return values;
    })();

    spellfire.RenderData = (function() {

        /**
         * Properties of a RenderData.
         * @memberof spellfire
         * @interface IRenderData
         * @property {spellfire.Sprite|null} [sprite] RenderData sprite
         */

        /**
         * Constructs a new RenderData.
         * @memberof spellfire
         * @classdesc Represents a RenderData.
         * @implements IRenderData
         * @constructor
         * @param {spellfire.IRenderData=} [properties] Properties to set
         */
        function RenderData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RenderData sprite.
         * @member {spellfire.Sprite} sprite
         * @memberof spellfire.RenderData
         * @instance
         */
        RenderData.prototype.sprite = 0;

        /**
         * Creates a new RenderData instance using the specified properties.
         * @function create
         * @memberof spellfire.RenderData
         * @static
         * @param {spellfire.IRenderData=} [properties] Properties to set
         * @returns {spellfire.RenderData} RenderData instance
         */
        RenderData.create = function create(properties) {
            return new RenderData(properties);
        };

        /**
         * Encodes the specified RenderData message. Does not implicitly {@link spellfire.RenderData.verify|verify} messages.
         * @function encode
         * @memberof spellfire.RenderData
         * @static
         * @param {spellfire.IRenderData} message RenderData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenderData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sprite != null && Object.hasOwnProperty.call(message, "sprite"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sprite);
            return writer;
        };

        /**
         * Encodes the specified RenderData message, length delimited. Does not implicitly {@link spellfire.RenderData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.RenderData
         * @static
         * @param {spellfire.IRenderData} message RenderData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenderData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RenderData message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.RenderData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.RenderData} RenderData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenderData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.RenderData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sprite = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RenderData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.RenderData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.RenderData} RenderData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenderData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RenderData message.
         * @function verify
         * @memberof spellfire.RenderData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenderData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sprite != null && message.hasOwnProperty("sprite"))
                switch (message.sprite) {
                default:
                    return "sprite: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates a RenderData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.RenderData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.RenderData} RenderData
         */
        RenderData.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.RenderData)
                return object;
            let message = new $root.spellfire.RenderData();
            switch (object.sprite) {
            default:
                if (typeof object.sprite === "number") {
                    message.sprite = object.sprite;
                    break;
                }
                break;
            case "SPRITE_NONE":
            case 0:
                message.sprite = 0;
                break;
            case "SPRITE_PLAYER":
            case 1:
                message.sprite = 1;
                break;
            case "SPRITE_BUSH":
            case 2:
                message.sprite = 2;
                break;
            case "SPRITE_TREE":
            case 3:
                message.sprite = 3;
                break;
            case "SPRITE_ROCK":
            case 4:
                message.sprite = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a RenderData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.RenderData
         * @static
         * @param {spellfire.RenderData} message RenderData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenderData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.sprite = options.enums === String ? "SPRITE_NONE" : 0;
            if (message.sprite != null && message.hasOwnProperty("sprite"))
                object.sprite = options.enums === String ? $root.spellfire.Sprite[message.sprite] === undefined ? message.sprite : $root.spellfire.Sprite[message.sprite] : message.sprite;
            return object;
        };

        /**
         * Converts this RenderData to JSON.
         * @function toJSON
         * @memberof spellfire.RenderData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenderData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RenderData
         * @function getTypeUrl
         * @memberof spellfire.RenderData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RenderData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.RenderData";
        };

        return RenderData;
    })();

    /**
     * EntityMode enum.
     * @name spellfire.EntityMode
     * @enum {number}
     * @property {number} ENTITY_MODE_DEFAULT=0 ENTITY_MODE_DEFAULT value
     * @property {number} ENTITY_MODE_PLAYER_WIELDING_PRIMARY_GUN=1 ENTITY_MODE_PLAYER_WIELDING_PRIMARY_GUN value
     * @property {number} ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_1=2 ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_1 value
     * @property {number} ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_2=3 ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_2 value
     * @property {number} ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_3=4 ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_3 value
     * @property {number} ENTITY_MODE_PLAYER_RELOADING=5 ENTITY_MODE_PLAYER_RELOADING value
     * @property {number} ENTITY_MODE_BUSH_SHAKING=6 ENTITY_MODE_BUSH_SHAKING value
     */
    spellfire.EntityMode = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENTITY_MODE_DEFAULT"] = 0;
        values[valuesById[1] = "ENTITY_MODE_PLAYER_WIELDING_PRIMARY_GUN"] = 1;
        values[valuesById[2] = "ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_1"] = 2;
        values[valuesById[3] = "ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_2"] = 3;
        values[valuesById[4] = "ENTITY_MODE_PLAYER_WIELDING_TACTICAL_ITEM_3"] = 4;
        values[valuesById[5] = "ENTITY_MODE_PLAYER_RELOADING"] = 5;
        values[valuesById[6] = "ENTITY_MODE_BUSH_SHAKING"] = 6;
        return values;
    })();

    /**
     * Gun enum.
     * @name spellfire.Gun
     * @enum {number}
     * @property {number} GUN_UNSPECIFIED=0 GUN_UNSPECIFIED value
     * @property {number} GUN_AK47=1 GUN_AK47 value
     * @property {number} GUN_M4=2 GUN_M4 value
     */
    spellfire.Gun = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GUN_UNSPECIFIED"] = 0;
        values[valuesById[1] = "GUN_AK47"] = 1;
        values[valuesById[2] = "GUN_M4"] = 2;
        return values;
    })();

    spellfire.PlayerState = (function() {

        /**
         * Properties of a PlayerState.
         * @memberof spellfire
         * @interface IPlayerState
         * @property {spellfire.Gun|null} [playerGun] PlayerState playerGun
         */

        /**
         * Constructs a new PlayerState.
         * @memberof spellfire
         * @classdesc Represents a PlayerState.
         * @implements IPlayerState
         * @constructor
         * @param {spellfire.IPlayerState=} [properties] Properties to set
         */
        function PlayerState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerState playerGun.
         * @member {spellfire.Gun} playerGun
         * @memberof spellfire.PlayerState
         * @instance
         */
        PlayerState.prototype.playerGun = 0;

        /**
         * Creates a new PlayerState instance using the specified properties.
         * @function create
         * @memberof spellfire.PlayerState
         * @static
         * @param {spellfire.IPlayerState=} [properties] Properties to set
         * @returns {spellfire.PlayerState} PlayerState instance
         */
        PlayerState.create = function create(properties) {
            return new PlayerState(properties);
        };

        /**
         * Encodes the specified PlayerState message. Does not implicitly {@link spellfire.PlayerState.verify|verify} messages.
         * @function encode
         * @memberof spellfire.PlayerState
         * @static
         * @param {spellfire.IPlayerState} message PlayerState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerGun != null && Object.hasOwnProperty.call(message, "playerGun"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.playerGun);
            return writer;
        };

        /**
         * Encodes the specified PlayerState message, length delimited. Does not implicitly {@link spellfire.PlayerState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.PlayerState
         * @static
         * @param {spellfire.IPlayerState} message PlayerState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerState message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.PlayerState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.PlayerState} PlayerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerState.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.PlayerState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.playerGun = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.PlayerState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.PlayerState} PlayerState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerState message.
         * @function verify
         * @memberof spellfire.PlayerState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerGun != null && message.hasOwnProperty("playerGun"))
                switch (message.playerGun) {
                default:
                    return "playerGun: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates a PlayerState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.PlayerState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.PlayerState} PlayerState
         */
        PlayerState.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.PlayerState)
                return object;
            let message = new $root.spellfire.PlayerState();
            switch (object.playerGun) {
            default:
                if (typeof object.playerGun === "number") {
                    message.playerGun = object.playerGun;
                    break;
                }
                break;
            case "GUN_UNSPECIFIED":
            case 0:
                message.playerGun = 0;
                break;
            case "GUN_AK47":
            case 1:
                message.playerGun = 1;
                break;
            case "GUN_M4":
            case 2:
                message.playerGun = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.PlayerState
         * @static
         * @param {spellfire.PlayerState} message PlayerState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.playerGun = options.enums === String ? "GUN_UNSPECIFIED" : 0;
            if (message.playerGun != null && message.hasOwnProperty("playerGun"))
                object.playerGun = options.enums === String ? $root.spellfire.Gun[message.playerGun] === undefined ? message.playerGun : $root.spellfire.Gun[message.playerGun] : message.playerGun;
            return object;
        };

        /**
         * Converts this PlayerState to JSON.
         * @function toJSON
         * @memberof spellfire.PlayerState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerState
         * @function getTypeUrl
         * @memberof spellfire.PlayerState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.PlayerState";
        };

        return PlayerState;
    })();

    spellfire.EntityState = (function() {

        /**
         * Properties of an EntityState.
         * @memberof spellfire
         * @interface IEntityState
         * @property {spellfire.IPlayerState|null} [playerState] EntityState playerState
         */

        /**
         * Constructs a new EntityState.
         * @memberof spellfire
         * @classdesc Represents an EntityState.
         * @implements IEntityState
         * @constructor
         * @param {spellfire.IEntityState=} [properties] Properties to set
         */
        function EntityState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityState playerState.
         * @member {spellfire.IPlayerState|null|undefined} playerState
         * @memberof spellfire.EntityState
         * @instance
         */
        EntityState.prototype.playerState = null;

        /**
         * Creates a new EntityState instance using the specified properties.
         * @function create
         * @memberof spellfire.EntityState
         * @static
         * @param {spellfire.IEntityState=} [properties] Properties to set
         * @returns {spellfire.EntityState} EntityState instance
         */
        EntityState.create = function create(properties) {
            return new EntityState(properties);
        };

        /**
         * Encodes the specified EntityState message. Does not implicitly {@link spellfire.EntityState.verify|verify} messages.
         * @function encode
         * @memberof spellfire.EntityState
         * @static
         * @param {spellfire.IEntityState} message EntityState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerState != null && Object.hasOwnProperty.call(message, "playerState"))
                $root.spellfire.PlayerState.encode(message.playerState, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EntityState message, length delimited. Does not implicitly {@link spellfire.EntityState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.EntityState
         * @static
         * @param {spellfire.IEntityState} message EntityState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntityState message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.EntityState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.EntityState} EntityState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityState.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.EntityState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.playerState = $root.spellfire.PlayerState.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.EntityState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.EntityState} EntityState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityState message.
         * @function verify
         * @memberof spellfire.EntityState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerState != null && message.hasOwnProperty("playerState")) {
                let error = $root.spellfire.PlayerState.verify(message.playerState);
                if (error)
                    return "playerState." + error;
            }
            return null;
        };

        /**
         * Creates an EntityState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.EntityState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.EntityState} EntityState
         */
        EntityState.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.EntityState)
                return object;
            let message = new $root.spellfire.EntityState();
            if (object.playerState != null) {
                if (typeof object.playerState !== "object")
                    throw TypeError(".spellfire.EntityState.playerState: object expected");
                message.playerState = $root.spellfire.PlayerState.fromObject(object.playerState);
            }
            return message;
        };

        /**
         * Creates a plain object from an EntityState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.EntityState
         * @static
         * @param {spellfire.EntityState} message EntityState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.playerState = null;
            if (message.playerState != null && message.hasOwnProperty("playerState"))
                object.playerState = $root.spellfire.PlayerState.toObject(message.playerState, options);
            return object;
        };

        /**
         * Converts this EntityState to JSON.
         * @function toJSON
         * @memberof spellfire.EntityState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EntityState
         * @function getTypeUrl
         * @memberof spellfire.EntityState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EntityState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.EntityState";
        };

        return EntityState;
    })();

    spellfire.Entity = (function() {

        /**
         * Properties of an Entity.
         * @memberof spellfire
         * @interface IEntity
         * @property {number|null} [id] Entity id
         * @property {spellfire.EntityType|null} [type] Entity type
         * @property {spellfire.ICollider|null} [collider] Entity collider
         * @property {spellfire.IRenderData|null} [renderData] Entity renderData
         * @property {spellfire.IEntityState|null} [state] Entity state
         */

        /**
         * Constructs a new Entity.
         * @memberof spellfire
         * @classdesc Represents an Entity.
         * @implements IEntity
         * @constructor
         * @param {spellfire.IEntity=} [properties] Properties to set
         */
        function Entity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Entity id.
         * @member {number} id
         * @memberof spellfire.Entity
         * @instance
         */
        Entity.prototype.id = 0;

        /**
         * Entity type.
         * @member {spellfire.EntityType} type
         * @memberof spellfire.Entity
         * @instance
         */
        Entity.prototype.type = 0;

        /**
         * Entity collider.
         * @member {spellfire.ICollider|null|undefined} collider
         * @memberof spellfire.Entity
         * @instance
         */
        Entity.prototype.collider = null;

        /**
         * Entity renderData.
         * @member {spellfire.IRenderData|null|undefined} renderData
         * @memberof spellfire.Entity
         * @instance
         */
        Entity.prototype.renderData = null;

        /**
         * Entity state.
         * @member {spellfire.IEntityState|null|undefined} state
         * @memberof spellfire.Entity
         * @instance
         */
        Entity.prototype.state = null;

        /**
         * Creates a new Entity instance using the specified properties.
         * @function create
         * @memberof spellfire.Entity
         * @static
         * @param {spellfire.IEntity=} [properties] Properties to set
         * @returns {spellfire.Entity} Entity instance
         */
        Entity.create = function create(properties) {
            return new Entity(properties);
        };

        /**
         * Encodes the specified Entity message. Does not implicitly {@link spellfire.Entity.verify|verify} messages.
         * @function encode
         * @memberof spellfire.Entity
         * @static
         * @param {spellfire.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.collider != null && Object.hasOwnProperty.call(message, "collider"))
                $root.spellfire.Collider.encode(message.collider, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.renderData != null && Object.hasOwnProperty.call(message, "renderData"))
                $root.spellfire.RenderData.encode(message.renderData, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                $root.spellfire.EntityState.encode(message.state, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Entity message, length delimited. Does not implicitly {@link spellfire.Entity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.Entity
         * @static
         * @param {spellfire.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Entity message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.Entity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.uint32();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 3: {
                        message.collider = $root.spellfire.Collider.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.renderData = $root.spellfire.RenderData.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.state = $root.spellfire.EntityState.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Entity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Entity message.
         * @function verify
         * @memberof spellfire.Entity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Entity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.collider != null && message.hasOwnProperty("collider")) {
                let error = $root.spellfire.Collider.verify(message.collider);
                if (error)
                    return "collider." + error;
            }
            if (message.renderData != null && message.hasOwnProperty("renderData")) {
                let error = $root.spellfire.RenderData.verify(message.renderData);
                if (error)
                    return "renderData." + error;
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                let error = $root.spellfire.EntityState.verify(message.state);
                if (error)
                    return "state." + error;
            }
            return null;
        };

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.Entity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.Entity} Entity
         */
        Entity.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.Entity)
                return object;
            let message = new $root.spellfire.Entity();
            if (object.id != null)
                message.id = object.id >>> 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "ENTITY_TYPE_UNSPECIFIED":
            case 0:
                message.type = 0;
                break;
            case "PLAYER":
            case 1:
                message.type = 1;
                break;
            }
            if (object.collider != null) {
                if (typeof object.collider !== "object")
                    throw TypeError(".spellfire.Entity.collider: object expected");
                message.collider = $root.spellfire.Collider.fromObject(object.collider);
            }
            if (object.renderData != null) {
                if (typeof object.renderData !== "object")
                    throw TypeError(".spellfire.Entity.renderData: object expected");
                message.renderData = $root.spellfire.RenderData.fromObject(object.renderData);
            }
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".spellfire.Entity.state: object expected");
                message.state = $root.spellfire.EntityState.fromObject(object.state);
            }
            return message;
        };

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.Entity
         * @static
         * @param {spellfire.Entity} message Entity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Entity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.type = options.enums === String ? "ENTITY_TYPE_UNSPECIFIED" : 0;
                object.collider = null;
                object.renderData = null;
                object.state = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.spellfire.EntityType[message.type] === undefined ? message.type : $root.spellfire.EntityType[message.type] : message.type;
            if (message.collider != null && message.hasOwnProperty("collider"))
                object.collider = $root.spellfire.Collider.toObject(message.collider, options);
            if (message.renderData != null && message.hasOwnProperty("renderData"))
                object.renderData = $root.spellfire.RenderData.toObject(message.renderData, options);
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = $root.spellfire.EntityState.toObject(message.state, options);
            return object;
        };

        /**
         * Converts this Entity to JSON.
         * @function toJSON
         * @memberof spellfire.Entity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Entity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Entity
         * @function getTypeUrl
         * @memberof spellfire.Entity
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Entity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.Entity";
        };

        return Entity;
    })();

    /**
     * ServerEventType enum.
     * @name spellfire.ServerEventType
     * @enum {number}
     * @property {number} SERVER_EVENT_TYPE_UNSPECIFIED=0 SERVER_EVENT_TYPE_UNSPECIFIED value
     */
    spellfire.ServerEventType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SERVER_EVENT_TYPE_UNSPECIFIED"] = 0;
        return values;
    })();

    spellfire.ServerEvent = (function() {

        /**
         * Properties of a ServerEvent.
         * @memberof spellfire
         * @interface IServerEvent
         * @property {spellfire.ServerEventType|null} [type] ServerEvent type
         */

        /**
         * Constructs a new ServerEvent.
         * @memberof spellfire
         * @classdesc Represents a ServerEvent.
         * @implements IServerEvent
         * @constructor
         * @param {spellfire.IServerEvent=} [properties] Properties to set
         */
        function ServerEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerEvent type.
         * @member {spellfire.ServerEventType} type
         * @memberof spellfire.ServerEvent
         * @instance
         */
        ServerEvent.prototype.type = 0;

        /**
         * Creates a new ServerEvent instance using the specified properties.
         * @function create
         * @memberof spellfire.ServerEvent
         * @static
         * @param {spellfire.IServerEvent=} [properties] Properties to set
         * @returns {spellfire.ServerEvent} ServerEvent instance
         */
        ServerEvent.create = function create(properties) {
            return new ServerEvent(properties);
        };

        /**
         * Encodes the specified ServerEvent message. Does not implicitly {@link spellfire.ServerEvent.verify|verify} messages.
         * @function encode
         * @memberof spellfire.ServerEvent
         * @static
         * @param {spellfire.IServerEvent} message ServerEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified ServerEvent message, length delimited. Does not implicitly {@link spellfire.ServerEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.ServerEvent
         * @static
         * @param {spellfire.IServerEvent} message ServerEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerEvent message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.ServerEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.ServerEvent} ServerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerEvent.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.ServerEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.ServerEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.ServerEvent} ServerEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerEvent message.
         * @function verify
         * @memberof spellfire.ServerEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                    break;
                }
            return null;
        };

        /**
         * Creates a ServerEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.ServerEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.ServerEvent} ServerEvent
         */
        ServerEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.ServerEvent)
                return object;
            let message = new $root.spellfire.ServerEvent();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "SERVER_EVENT_TYPE_UNSPECIFIED":
            case 0:
                message.type = 0;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.ServerEvent
         * @static
         * @param {spellfire.ServerEvent} message ServerEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = options.enums === String ? "SERVER_EVENT_TYPE_UNSPECIFIED" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.spellfire.ServerEventType[message.type] === undefined ? message.type : $root.spellfire.ServerEventType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this ServerEvent to JSON.
         * @function toJSON
         * @memberof spellfire.ServerEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServerEvent
         * @function getTypeUrl
         * @memberof spellfire.ServerEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServerEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.ServerEvent";
        };

        return ServerEvent;
    })();

    spellfire.ServerPacket = (function() {

        /**
         * Properties of a ServerPacket.
         * @memberof spellfire
         * @interface IServerPacket
         * @property {spellfire.ITimestamp|null} [timestamp] ServerPacket timestamp
         * @property {Array.<spellfire.IEntity>|null} [entities] ServerPacket entities
         * @property {Array.<spellfire.IServerEvent>|null} [events] ServerPacket events
         */

        /**
         * Constructs a new ServerPacket.
         * @memberof spellfire
         * @classdesc Represents a ServerPacket.
         * @implements IServerPacket
         * @constructor
         * @param {spellfire.IServerPacket=} [properties] Properties to set
         */
        function ServerPacket(properties) {
            this.entities = [];
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerPacket timestamp.
         * @member {spellfire.ITimestamp|null|undefined} timestamp
         * @memberof spellfire.ServerPacket
         * @instance
         */
        ServerPacket.prototype.timestamp = null;

        /**
         * ServerPacket entities.
         * @member {Array.<spellfire.IEntity>} entities
         * @memberof spellfire.ServerPacket
         * @instance
         */
        ServerPacket.prototype.entities = $util.emptyArray;

        /**
         * ServerPacket events.
         * @member {Array.<spellfire.IServerEvent>} events
         * @memberof spellfire.ServerPacket
         * @instance
         */
        ServerPacket.prototype.events = $util.emptyArray;

        /**
         * Creates a new ServerPacket instance using the specified properties.
         * @function create
         * @memberof spellfire.ServerPacket
         * @static
         * @param {spellfire.IServerPacket=} [properties] Properties to set
         * @returns {spellfire.ServerPacket} ServerPacket instance
         */
        ServerPacket.create = function create(properties) {
            return new ServerPacket(properties);
        };

        /**
         * Encodes the specified ServerPacket message. Does not implicitly {@link spellfire.ServerPacket.verify|verify} messages.
         * @function encode
         * @memberof spellfire.ServerPacket
         * @static
         * @param {spellfire.IServerPacket} message ServerPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerPacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                $root.spellfire.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.entities != null && message.entities.length)
                for (let i = 0; i < message.entities.length; ++i)
                    $root.spellfire.Entity.encode(message.entities[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.spellfire.ServerEvent.encode(message.events[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServerPacket message, length delimited. Does not implicitly {@link spellfire.ServerPacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spellfire.ServerPacket
         * @static
         * @param {spellfire.IServerPacket} message ServerPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerPacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerPacket message from the specified reader or buffer.
         * @function decode
         * @memberof spellfire.ServerPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spellfire.ServerPacket} ServerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerPacket.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spellfire.ServerPacket();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = $root.spellfire.Timestamp.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.entities && message.entities.length))
                            message.entities = [];
                        message.entities.push($root.spellfire.Entity.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.spellfire.ServerEvent.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerPacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spellfire.ServerPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spellfire.ServerPacket} ServerPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerPacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerPacket message.
         * @function verify
         * @memberof spellfire.ServerPacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerPacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                let error = $root.spellfire.Timestamp.verify(message.timestamp);
                if (error)
                    return "timestamp." + error;
            }
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (let i = 0; i < message.entities.length; ++i) {
                    let error = $root.spellfire.Entity.verify(message.entities[i]);
                    if (error)
                        return "entities." + error;
                }
            }
            if (message.events != null && message.hasOwnProperty("events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.spellfire.ServerEvent.verify(message.events[i]);
                    if (error)
                        return "events." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServerPacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spellfire.ServerPacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spellfire.ServerPacket} ServerPacket
         */
        ServerPacket.fromObject = function fromObject(object) {
            if (object instanceof $root.spellfire.ServerPacket)
                return object;
            let message = new $root.spellfire.ServerPacket();
            if (object.timestamp != null) {
                if (typeof object.timestamp !== "object")
                    throw TypeError(".spellfire.ServerPacket.timestamp: object expected");
                message.timestamp = $root.spellfire.Timestamp.fromObject(object.timestamp);
            }
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".spellfire.ServerPacket.entities: array expected");
                message.entities = [];
                for (let i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".spellfire.ServerPacket.entities: object expected");
                    message.entities[i] = $root.spellfire.Entity.fromObject(object.entities[i]);
                }
            }
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".spellfire.ServerPacket.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                        throw TypeError(".spellfire.ServerPacket.events: object expected");
                    message.events[i] = $root.spellfire.ServerEvent.fromObject(object.events[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerPacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spellfire.ServerPacket
         * @static
         * @param {spellfire.ServerPacket} message ServerPacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerPacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.entities = [];
                object.events = [];
            }
            if (options.defaults)
                object.timestamp = null;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = $root.spellfire.Timestamp.toObject(message.timestamp, options);
            if (message.entities && message.entities.length) {
                object.entities = [];
                for (let j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.spellfire.Entity.toObject(message.entities[j], options);
            }
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.spellfire.ServerEvent.toObject(message.events[j], options);
            }
            return object;
        };

        /**
         * Converts this ServerPacket to JSON.
         * @function toJSON
         * @memberof spellfire.ServerPacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerPacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServerPacket
         * @function getTypeUrl
         * @memberof spellfire.ServerPacket
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServerPacket.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spellfire.ServerPacket";
        };

        return ServerPacket;
    })();

    return spellfire;
})();

export { $root as default };
