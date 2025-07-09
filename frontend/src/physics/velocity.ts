import { type Vec2, vec2 } from "../lib/vec2";

export type EasingFunc = (n: number) => number;
export const easing: { [fn: string]: EasingFunc } = {
    linear: (n: number) => n,
    quadratic: (n: number) => n * n,
    sqrt: (n: number) => Math.sqrt(n),
};

export interface Velocity {
    calculate(): Vec2;
}

export class AccelVelocity implements Velocity {
    initialVelocity: Vec2;
    currentAccelTick: number;
    accelTickDuration: number;
    targetVelocity: Vec2;
    easingFunc: EasingFunc;
    constructor(
        initialVelocity: Vec2,
        currentAccelTick: number,
        accelTickDuration: number,
        targetVelocity: Vec2,
        easingFunc: EasingFunc,
    ) {
        this.initialVelocity = initialVelocity;
        this.currentAccelTick = currentAccelTick;
        this.accelTickDuration = accelTickDuration;
        this.targetVelocity = targetVelocity;
        this.easingFunc = easingFunc;
    }
    calculate(): Vec2 {
        let velocityDiffProgress =
            (this.accelTickDuration - this.currentAccelTick) /
            this.accelTickDuration;
        return vec2.add(
            vec2.lerp(
                this.initialVelocity,
                this.targetVelocity,
                velocityDiffProgress,
            ),
            this.targetVelocity,
        );
    }
}
export class StaticVelocity implements Velocity {
    velocity: Vec2;
    constructor(velocity: Vec2) {
        this.velocity = velocity;
    }
    calculate(): Vec2 {
        return this.velocity;
    }
}
