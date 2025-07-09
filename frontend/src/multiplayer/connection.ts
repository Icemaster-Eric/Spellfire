import { Publisher } from "../communication/publisher";
import type { Service } from "../communication/service";
import type { Vec2 } from "../lib/vec2";

export type PacketEntity = {
    id: number;
    type: "player" | "rock" | "tree";
    position: [number, number];
    rotation: number;
    shape: { type: "circle"; radius: number };
};
type ServerPackets = {
    initialize: {
        entities: Array<PacketEntity>;
        playerId: number;
    };
    update: {
        entities: Array<PacketEntity>;
    };
};

type ClientPackets = {
    enter_game: {};
    move: {
        movement: [number, number];
    };
};

type ConnectionCommands = {
    send:
        | { type: "enter_game" } & ClientPackets["enter_game"]
        | { type: "move" } & ClientPackets["move"]
};
export class Connection
    extends Publisher<ServerPackets>
    implements Service<ConnectionCommands>
{
    _subscribers = {
        initialize: [],
        update: [],
    };
    ws: WebSocket;
    constructor(wsURL: string) {
        super();
        this.ws = new WebSocket(wsURL);
        this.ws.onopen = (ev) => {};
        this.ws.onmessage = ({ data: data_ }) => {
            const data = JSON.parse(data_);
            switch (data.key) {
                case "initialize":
                    this.publish("initialize", { playerId: data.client_id as number, entities: data.entities as PacketEntity[] });
                    break;
                case "update":
                    this.publish("update", { entities: data.entities as PacketEntity[] });
                    break;
            }
        };
        this.ws.onclose = ({ reason }) => {};
    }
    run<C extends keyof ConnectionCommands>(command: C, commandData: ConnectionCommands[C]) {
        switch (command) {
            case "send":
                this.ws.send(JSON.stringify({ ...commandData }));
                break;
        }
    }
    parseAndDelegateServerPacket() {

    }
}
