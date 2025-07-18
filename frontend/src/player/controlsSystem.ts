import { System } from "../communication/system";
import type { Inputs } from "../ui/inputs";
import { vec2, type Vec2 } from "../math/vec2";
import type { Connection } from "../multiplayer/connection";
import type { World } from "../world/world";
import type { PlayerState } from "./playerState";

export class ControlsSystem extends System {
    world: World;
    connection: Connection;
    moving = {
        N: false,
        E: false,
        S: false,
        W: false,
    };
    playerState: PlayerState;
    constructor(
        world: World,
        inputs: Inputs,
        connection: Connection,
        playerState: PlayerState,
    ) {
        super();
        this.world = world;
        this.connection = connection;
        this.playerState = playerState;
        inputs.subscribeTo("start_action", ({ actionType }) => {
            switch (actionType) {
                case "moveN":
                    this.moving.N = true;
                    break;
                case "moveE":
                    this.moving.E = true;
                    break;
                case "moveS":
                    this.moving.S = true;
                    break;
                case "moveW":
                    this.moving.W = true;
                    break;
                case "fire":
                    this.connection.run("send", { type: "start_fire" });
                    break;
            }
        });
        inputs.subscribeTo("stop_action", ({ actionType }) => {
            switch (actionType) {
                case "moveN":
                    this.moving.N = false;
                    break;
                case "moveE":
                    this.moving.E = false;
                    break;
                case "moveS":
                    this.moving.S = false;
                    break;
                case "moveW":
                    this.moving.W = false;
                    break;
                case "fire":
                    this.connection.run("send", { type: "stop_fire" });
                    break;
            }
        });
        inputs.subscribeTo("pointer_move", ({ screen_position }) => {
            playerState.relativeCursorPos.set(
                vec2.subtract(
                    screen_position,
                    vec2(window.innerWidth / 2, window.innerHeight / 2),
                ),
            );
        });
    }
    currentMoveDir = vec2(0);
    updateCurrentMoveDir() {
        this.currentMoveDir[0] = 0;
        this.currentMoveDir[1] = 0;
        if (this.moving.N) this.currentMoveDir[1] += 1;
        if (this.moving.E) this.currentMoveDir[0] += 1;
        if (this.moving.S) this.currentMoveDir[1] -= 1;
        if (this.moving.W) this.currentMoveDir[0] -= 1;
    }
    update(): void {
        this.updateCurrentMoveDir();

        this.movePlayer(this.currentMoveDir);
        this.connection.run("send", {
            type: "move",
            movement: this.currentMoveDir,
        });

        this.rotatePlayer(this.playerState.relativeCursorPos);
    }
    movePlayer(direction: Vec2): void {
        if (!this.world.clientPlayerExists()) return;
        this.world.getClientPlayer()!.currentLocalCollider.velocity =
            vec2.scale(vec2.normalize(direction), 2);
    }
    rotatePlayer(direction: Vec2) {
        if (!this.world.clientPlayerExists()) return;
        this.world.getClientPlayer()!.currentLocalCollider.rotation =
            vec2.angle(direction);
    }
}
