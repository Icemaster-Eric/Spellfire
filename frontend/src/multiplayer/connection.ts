import { Publisher } from "../communication/publisher";
import type { Service } from "../communication/service";
import type { Vec2 } from "../lib/vec2";

type PacketEntity = {
    id: number,
    type: "player" | "rock" | "tree"
    position: [number, number],
    rotation: number,
    shape: { type: "circle", radius: number }
}
type ServerPackets = {
    initialize: {
        entities: Array<PacketEntity>,
        playerId: Array<PacketEntity>
    },
    update: {
        entities: Array<PacketEntity>
    }
}

type ClientPackets = {
    enter_game: {},
    move: {
        movement: [number, number]
    }
}

type ConnectionCommands = {
    send: 
        | { type: "enter_game"; payload: ClientPackets["enter_game"] }
        | { type: "move"; payload: ClientPackets["move"] }
}
export class Connection extends Publisher<ServerPackets> implements Service<ConnectionCommands> {
    _subscribers = {
        initialize: [],
        update: []
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
                    this.publish("initialize", {});
                    break;
                case "update":
                    this.publish("update", {})
                    break;
            }
        };
        this.ws.onclose = ({ reason }) => {};
    }
    run() {

    }
    parseAndDelegateServerPacket() {

    }
}
