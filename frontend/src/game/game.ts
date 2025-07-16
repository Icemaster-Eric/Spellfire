import { Application, Container } from "pixi.js";
import { Controls } from "../ui/controls";
import { Display } from "../display/display";
import { Publisher } from "../communication/publisher";
import { World } from "../world/world";
import { PhysicsSystem } from "../physics/physicsSystem";
import { Connection } from "../multiplayer/connection";
import { GameLoop } from "./gameLoop";
import { MovementSystem } from "../player/movementSystem";
import { WorldSystem } from "../world/worldSystem";
import { DebugInfoUISystem } from "../ui/debugInfo";

export class Game {
    static async init() {
        // state/publishers
        const world = new World();
        const controls = new Controls();
        const connection = new Connection(
            new URL(
                "/ws?guest=true",
                import.meta.env.VITE_BACKEND_URL,
            ).toString(),
        );

        // systems
        const physicsSystem = new PhysicsSystem(world);
        const worldSystem = new WorldSystem(world, connection);
        const movementSystem = new MovementSystem(world, controls, connection);
        const debugInfoUISystem = new DebugInfoUISystem(controls, world);
        const gameLoop = new GameLoop([
            physicsSystem,
            worldSystem,
            movementSystem,
            debugInfoUISystem,
        ]);
        // display
        const display = await Display.create();
        display.init(world);
    }
}
