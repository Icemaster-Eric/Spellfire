import { Application, Container } from "pixi.js";
import { GameState } from "../state/gameState";
import { Controls } from "../ui/controls";
import { PhysicsDriver } from "../physics/physicsDriver";
import { Display } from "./display";
import { Entity } from "../entities/entity";
import { Player } from "../entities/player";
import { StaticVelocity } from "../physics/velocity";
import { vec2 } from "../lib/vec2";
import { aabb } from "../lib/aabb";
import type { PacketEntity } from "../multiplayer/connection";
import { Rock } from "../entities/environment/rock";
import { Tree } from "../entities/environment/tree";

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
        state.connection.run("send", { type: "enter_game" });
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
        const entityFromPacketEntityfromPacketEntity = (packetEntity: PacketEntity): Entity => {
        let entity: Entity;
        switch (packetEntity.type) {
            case "player":
                entity = new Player(
                    packetEntity.id,
                    new StaticVelocity(vec2(0)),
                    packetEntity.position,
                    packetEntity.rotation,
                    {
                        aabb() {
                            return aabb([0, 0], [0, 0]);
                        },
                    },
                );
                break;
            case "rock":
                entity = new Rock(
                    packetEntity.id,
                    new StaticVelocity(vec2(0)),
                    packetEntity.position,
                    packetEntity.rotation,
                    {
                        aabb() {
                            return aabb([0, 0], [0, 0]);
                        },
                    },
                );
                break;
            case "tree":
                entity = new Tree(
                    packetEntity.id,
                    new StaticVelocity(vec2(0)),
                    packetEntity.position,
                    packetEntity.rotation,
                    {
                        aabb() {
                            return aabb([0, 0], [0, 0]);
                        },
                    },
                );
                break;
        }
        return entity;
    }
        state.connection.subscribeTo("initialize", ({ entities: packetEntities, playerId }) => {
            const entities = packetEntities.map(entityFromPacketEntityfromPacketEntity);
            state.world.initialize(entities, playerId);
        });
        state.connection.subscribeTo("update", ({ entities: packetEntities }) => {
            const entities = packetEntities.map(entityFromPacketEntityfromPacketEntity);
            state.world.entities = entities;
        })
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
