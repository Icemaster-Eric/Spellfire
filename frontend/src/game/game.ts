import { Application } from "pixi.js";
import { GameState } from "../state/gameState";
import { Controls } from "../ui/controls";
import { PhysicsDriver } from "../physics/physicsDriver";

export class Game {
    app: Application;
    loop: GameLoop;
    state: GameState;
    constructor(app: Application, loop: GameLoop, state: GameState) {
        this.app = app;
        this.loop = loop;
        this.state = state;
    }
    static async init(): Promise<Game> {
        const app = new Application();

        await app.init({
            background: "red",
            resizeTo: window,
            autoDensity: true,
            antialias: true,
            canvas: document.getElementById("game")! as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
        });
        const state = new GameState();
        const controls = new Controls(state.settings.keybinds);
        const physicsDriver = new PhysicsDriver(state);
        controls.subscribeTo("move", (payload) => {
            if (state.world.isInitialized()) {
                physicsDriver.setVelocity(state.world.clientPlayerId, payload.direction)
            }
            
        })
        const loop = new GameLoop(state);
        const game = new Game(app, loop, state);
        return game;
    }
    
}

class GameLoop {
    clientTickNum = 0;
    lastTickTimestamp = Date.now();
    tickRate = 30;
    constructor(gameState: GameState) {
        const loop = (timestamp: number) => {
            let tickMs = 1000 / this.tickRate;
            if (timestamp - this.lastTickTimestamp > tickMs) {
                this.lastTickTimestamp = timestamp;
            }
            if (gameState.world.isInitialized()) {
                gameState.world.entities.forEach(entity => entity.update());
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
}
