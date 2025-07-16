import { Publisher } from "../communication/publisher";
import type { System } from "../communication/system";

type GameLoopMessages = {
    tick: {};
};
export class GameLoop extends Publisher<GameLoopMessages> {
    protected _subscribers = { tick: [] };
    lastTickTimestamp = Date.now();
    tickRate = 30;
    constructor(systems: Array<System>) {
        super();
        const loop = () => {
            const currentTimestamp = Date.now();
            let tickMs = 1000 / this.tickRate;
            if (currentTimestamp - this.lastTickTimestamp > tickMs) {
                const dt = currentTimestamp - this.lastTickTimestamp;
                this.publish("tick", {});
                systems.forEach((system) => {
                    system.update(dt);
                });
                this.lastTickTimestamp = currentTimestamp;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}