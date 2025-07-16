import { System } from "../communication/system";
import type { Controls } from "../ui/controls";
import { vec2, type Vec2 } from "../math/vec2";
import type { Connection } from "../multiplayer/connection";
import type { World } from "../world/world";

export class MovementSystem extends System {
    world: World;
    connection: Connection;
    moving = {
        N: false,
        E: false,
        S: false,
        W: false,
    };
    constructor(world: World, controls: Controls, connection: Connection) {
        super();
        this.world = world;
        this.connection = connection;
        controls.subscribeTo("start_action", ({ actionType }) => {
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
            }
        });
        controls.subscribeTo("stop_action", ({ actionType }) => {
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
            }
        });
    }
    currentMoveDir = vec2(0);
    updateCurrentMoveDir() {
        this.currentMoveDir[0] = 0;
        this.currentMoveDir[1] = 0;
        if (this.moving.N) this.currentMoveDir[0] += 1;
        if (this.moving.E) this.currentMoveDir[1] += 1;
        if (this.moving.S) this.currentMoveDir[0] -= 1;
        if (this.moving.W) this.currentMoveDir[1] -= 1;
    }
    update(): void {
        this.updateCurrentMoveDir();
        if (!vec2.eq(this.currentMoveDir, vec2.ZERO)) {
            this.movePlayer(this.currentMoveDir);
            this.connection.run("send", {
                type: "move",
                movement: this.currentMoveDir,
            });
        }
    }
    movePlayer(direction: Vec2): void {
        if (!this.world.clientPlayerExists()) return;
        this.world.getClientPlayer()!.localCollider.velocity = direction;
    }
}
