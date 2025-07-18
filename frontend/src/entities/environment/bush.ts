import { Graphics, Sprite } from "pixi.js";
import { Collider, Entity, RenderData } from "../entity";
import { entitySpec } from "../entitySpec";
import { getTexture } from "../../assets";

export class Bush extends Entity {
    constructor(id: number, initialCollider: Collider, renderData: RenderData) {
        super(id, initialCollider, renderData);
        this.initSprite(new Sprite(getTexture(renderData.sprite)));
    }
}