import { Connection } from "../multiplayer/connection";
import { Settings } from "./settings";
import { World } from "./world";

export class GameState {
    connection: Connection;
    settings: Settings = new Settings();
    world: World;
    constructor() {
        this.connection = new Connection(new URL("/ws", import.meta.env.VITE_BACKEND_URL).toString());
        this.world = new World();
    }
}