import { Container, Graphics, Text } from "pixi.js";
import { Collider, Entity, RenderData } from "./entity";
import { entitySpec } from "./entitySpec";
import { vec2 } from "../math/vec2";
import type { PlayerState } from "../player/playerState";

export class Player extends Entity {
    name: string = "";
    health: number = 100;
    nameDisplay: Text = null!;
    healthDisplay: Container = null!;
    constructor(id: number, initialCollider: Collider, renderData: RenderData) {
        super(id, initialCollider, renderData);
        this.initSprite(playerSprite());
        this.nameDisplay = new Text({
            text: "",
        });
        this.nameDisplay.anchor.set(.5);
        this.healthDisplay = new Graphics()
            .rect(-48, 2, 96 * this.health/100 - 48, 16)
            .fill("green")
            .stroke({ width: 2, color: "white" })
    }
    updateSprite(scaleFactor: number): void {
        super.updateSprite(scaleFactor);
        if (!this.nameDisplay.parent) {
            this.sprite.parent.addChild(this.nameDisplay, this.healthDisplay);
        }
        this.sprite.origin.set(0);
        this.nameDisplay.position.copyFrom(this.sprite.position)
        this.nameDisplay.position.y -= 55;
        this.healthDisplay.position.copyFrom(this.sprite.position)
        this.healthDisplay.position.y -= 45;
        this.nameDisplay.text = this.name;
    }
}
function playerSprite(): Graphics {
    const g = new Graphics();

    g.setStrokeStyle({ width: 10, color: "black" });
    g.circle(0, 0, 50).fill(0xeeee66);

    g.setStrokeStyle({ width: 0 });
    g.circle(25, 25, 5).fill(0x000000);
    g.circle(25, -25, 5).fill(0x000000);

    return g;
}
