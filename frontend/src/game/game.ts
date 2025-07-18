import { Application, Container } from "pixi.js";
import { Inputs } from "../ui/inputs";
import { Display } from "../display/display";
import { Publisher } from "../communication/publisher";
import { World } from "../world/world";
import { PhysicsSystem } from "../physics/physicsSystem";
import { Connection } from "../multiplayer/connection";
import { GameLoop } from "./gameLoop";
import { ControlsSystem } from "../player/controlsSystem";
import { WorldSystem } from "../world/worldSystem";
import { DebugInfo, DebugInfoUISystem } from "../ui/debugInfo";
import { loadAllAssets } from "../assets";
import { PlayerState } from "../player/playerState";
import { AutomaticRifle } from "../player/gunner-weapons/gun";

export class Game {
    static async init() {
        await loadAllAssets();

        // state/publishers
        const world = new World();
        const controls = new Inputs();
        const debugInfo = new DebugInfo();
        const playerState = new PlayerState(100, new AutomaticRifle());
        const connection = new Connection(
            new URL(
                "/ws?guest=true",
                import.meta.env.VITE_BACKEND_URL,
            ).toString(),
            debugInfo,
            playerState
        );

        // systems
        const physicsSystem = new PhysicsSystem(world);
        const worldSystem = new WorldSystem(world, connection);
        const movementSystem = new ControlsSystem(world, controls, connection, playerState);
        const debugInfoUISystem = new DebugInfoUISystem(
            controls,
            world,
            debugInfo,
        );
        const gameLoop = new GameLoop([
            physicsSystem,
            worldSystem,
            movementSystem,
            debugInfoUISystem,
        ]);

        // display
        const display = await Display.create(debugInfo);
        display.init(world, playerState);
    }
}
