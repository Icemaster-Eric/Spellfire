import { Publisher } from "../communication/publisher";
import type { Service } from "../communication/service";
import { vec2, type Vec2 } from "../math/vec2";
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
} & { [K in ServerEvent as `packet_${K["type"]}`]: Omit<ServerEvent, "type"> };

export class Connection
    extends Publisher<ConnectionMessages>
    implements Service<ConnectionCommands>
{
    _subscribers = {
        open: [],
        packet_initialize: [],
        packet_update: [],
    };
    queuedOutboundPackets: Array<ClientEvent> = [];
    ws: WebSocket;
    constructor(wsURL: string) {
        super();
        this.ws = new WebSocket(wsURL);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = (ev) => {
            this.publish("open", {});
            setTimeout(() => {
                this.sendOutboundPackets();
            }, 1000 / 30);
        };
        this.ws.onmessage = ({ data: encodedData }) => {
            parseServerPacket(encodedData as ArrayBuffer);
            switch (data) {
                case "initialize":
                    this.publish("packet_initialize", {
                        playerId: data.client_id as number,
                        entities: data.entities as PacketEntity[],
                    });
                    break;
                case "update":
                    this.publish("packet_update", {
                        entities: data.entities as PacketEntity[],
                    });
                    break;
            }
        };
        this.ws.onclose = ({ reason }) => {};
    }
    run<C extends keyof ConnectionCommands>(
        command: C,
        commandData: ConnectionCommands[C],
    ) {
        switch (command) {
            case "send":
                switch (commandData.type) {
                    case "enter_game":
                        this.queuedOutboundPackets.push({ type: "enter_game" });
                        break;
                }
                break;
        }
    }
    sendOutboundPackets() {
        this.ws.send(this.serializeOutboundPackets());
        this.queuedOutboundPackets.length = 0;
    }
    serializeOutboundPackets(): Uint8Array {
        let clientPacket = spellfire.ClientPacket.create({
            timestamp: spellfire.Timestamp.create({
                ms: Date.now(),
            }),
            events: this.queuedOutboundPackets.map(clientEventToProtobufEvent),
        });
        return spellfire.ClientPacket.encode(clientPacket).finish();
    }
    deserializeServerPacket() {}
}
