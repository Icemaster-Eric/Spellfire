import { Application, Container } from "pixi.js";
import { GameState } from "../state/gameState";
import { Controls } from "../ui/controls";
import { PhysicsDriver } from "../physics/physicsDriver";
import { Display } from "./display";
import { EntityDriver } from "../entities/entityDriver";

export class Game {
    display: Display;
    loop: GameLoop;
    state: GameState;
    constructor(display: Display, loop: GameLoop, state: GameState) {
        this.display = display;
        this.loop = loop;
        this.state = state;
    }
    static async init(): Promise<Game> {
        const state = new GameState();
        const display = await Display.init(state);
        const controls = new Controls(state.settings.keybinds);
        const physicsDriver = new PhysicsDriver(state);
        const entityDriver = new EntityDriver(state);

        state.connection.subscribeTo("open", () =>
            state.connection.run("send", { type: "enter_game" }),
        );

        // Game Logic
        controls.subscribeTo("move", (payload) => {
            if (state.world.isInitialized()) {
                physicsDriver.setEntityVelocity(
                    state.world.clientPlayerId,
                    payload.direction,
                );
                state.connection.run("send", {
                    type: "move",
                    movement: payload.direction,
                });
            }
        });

        state.connection.subscribeTo(
            "packet_initialize",
            ({ entities: packetEntities, playerId }) => {
                entityDriver.initializeWorld(packetEntities, playerId)
            },
        );
        state.connection.subscribeTo(
            "packet_update",
            ({ entities: packetEntities }) => {
                entityDriver.updateWorld(packetEntities);
            },
        );
        const loop = new GameLoop(state, { physicsDriver });
        const game = new Game(display, loop, state);
        return game;
    }
}

class GameLoop {
    clientTickNum = 0;
    lastTickTimestamp = Date.now();
    tickRate = 30;
    constructor(
        gameState: GameState,
        drivers: { physicsDriver: PhysicsDriver },
    ) {
        const loop = (timestamp: number) => {
            let tickMs = 1000 / this.tickRate;
            if (timestamp - this.lastTickTimestamp > tickMs) {
                this.lastTickTimestamp = timestamp;
            }
            if (gameState.world.isInitialized()) {
                drivers.physicsDriver.update();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
