import { Application, Container } from "pixi.js";
import type { World } from "../world/world";
import { initDevtools } from "@pixi/devtools";
import { vec2 } from "../math/vec2";
import type { Meters } from "../entities/entity";

export class Display {
    app: Application;
    root: Container;
    displayViewSizeMeters = {
        width: 8 as Meters,
        height: 4.5 as Meters
    };
    constructor(app: Application) {
        this.app = app;
        this.root = new Container();
        this.app.stage.addChild(this.root);
    }
    static async create(): Promise<Display> {
        const app = new Application();
        await app.init({
            background: "green",
            resizeTo: window,
            autoDensity: true,
            antialias: true,
            canvas: document.getElementById("game")! as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
        });
        initDevtools({ app });
        
        const display = new Display(app);
        
        return display;
    }
    init(world: World) {
        this.app.ticker.add((ticker) => {
            if (!world.clientPlayerExists()) return;
            const playerEntity = world.getClientPlayer()!;
            const playerPos = playerEntity.localCollider.position;
            this.root.x = this.app.screen.width / 2 - playerPos[0];
            this.root.y = this.app.screen.height / 2 - playerPos[1];

            world.entities.forEach((entity) => {
                if (entity.sprite.parent !== this.root) {
                    this.root.addChild(entity.sprite);
                }
                entity.updateSprite();
            });
        });
    }
}
