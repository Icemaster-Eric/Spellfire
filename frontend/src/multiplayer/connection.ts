import { Publisher } from "../communication/publisher";
import type { Service } from "../communication/service";
import { vec2, type Vec2 } from "../math/vec2";
import type { PlayerState } from "../player/playerState";
import type { DebugInfo } from "../ui/debugInfo";
import {
    type ClientEvent,
    type ServerEvent,
    type PacketEntity,
    clientEventToProtobufEvent,
    parseServerPacket,
} from "./packets";
import { spellfire } from "./pb-spec";

type ConnectionCommands = {
    send: ClientEvent;
};
type ConnectionMessages = {
    open: {};
    entity_update: { entities: PacketEntity[]; timestamp: number };
} & { [K in ServerEvent as `event_${K["type"]}`]: Omit<ServerEvent, "type"> };

export class Connection
    extends Publisher<ConnectionMessages>
    implements Service<ConnectionCommands>
{
    _subscribers = {
        open: [],
        event_initialize: [],
        entity_update: [],
    };
    queuedOutboundPackets: Array<ClientEvent> = [];
    ws: WebSocket;
    playerState: PlayerState;

    constructor(wsURL: string, debugInfo: DebugInfo, playerState: PlayerState) {
        super();
        this.playerState = playerState;
        this.ws = new WebSocket(wsURL);
        this.ws.binaryType = "arraybuffer";
        let tickInterval: ReturnType<typeof setTimeout>;
        this.ws.onopen = (ev) => {
            console.log("ws open");
            this.publish("open", {});
            tickInterval = setInterval(() => {
                this.sendOutboundPackets();
                debugInfo.packetsPublished += 1;
            }, 1000 / 30);
            setInterval(() => {
                this.ws.send("ping");
            }, 5000);
        };
        this.ws.onmessage = ({ data: encodedData }) => {
            if (encodedData === "pong") {
                return;
            }
            let packet = parseServerPacket(encodedData as ArrayBuffer);
            if (packet.entities.length > 0) {
                this.publish("entity_update", {
                    entities: packet.entities,
                    timestamp: packet.timestamp,
                });
            }
            for (const event of packet.events) {
                switch (event.type) {
                    case "initialize":
                        this.publish("event_initialize", {
                            playerID: event.playerID,
                        });
                        break;
                }
            }
        };
        this.ws.onclose = ({ reason }) => {
            console.log("Server disconnected: " + reason);
            clearInterval(tickInterval);
        };
    }
    run<C extends keyof ConnectionCommands>(
        command: C,
        commandData: ConnectionCommands[C],
    ) {
        switch (command) {
            case "send":
                switch (commandData.type) {
                    case "move":
                        this.queuedOutboundPackets.push({
                            type: "move",
                            movement: commandData.movement,
                        });
                        break;
                    case "start_fire":
                        this.queuedOutboundPackets.push({
                            type: "start_fire",
                        })
                        break;
                    case "stop_fire":
                        this.queuedOutboundPackets.push({
                            type: "stop_fire",
                        })
                        break;
                }
                break;
        }
    }
    sendOutboundPackets() {
        /*
        console.debug(
            "SENT TO SERVER",
            JSON.stringify(this.queuedOutboundPackets),
        );*/
        this.ws.send(this.serializeOutboundPackets());
        this.queuedOutboundPackets.length = 0;
    }
    serializeOutboundPackets(): Uint8Array {
        // console.log(JSON.stringify(this.queuedOutboundPackets));
        let clientPacket = spellfire.ClientPacket.create({
            timestamp: spellfire.Timestamp.create({
                ms: Date.now(),
            }),
            events: this.queuedOutboundPackets.map(clientEventToProtobufEvent),
            cursor: spellfire.Vec2.create(
                vec2.toPoint(this.playerState.relativeCursorPos),
            ),
        });
        return spellfire.ClientPacket.encode(clientPacket).finish();
    }
    deserializeServerPacket() {}
}
