import { Application, Bounds, Container, RenderLayer, TilingSprite } from "pixi.js";
import type { World } from "../world/world";
import { initDevtools } from "@pixi/devtools";
import type { Meters } from "../entities/entity";
import { getTexture } from "../assets";
import type { DebugInfo } from "../ui/debugInfo";
import type { PlayerState } from "../player/playerState";

const _bounds = new Bounds();
export class Display {
    app: Application;
    root: Container;
    backgroundGrid: TilingSprite;
    layers = {
        sky: new RenderLayer(),
        foreground: new RenderLayer(),
        background: new RenderLayer(),
        floor: new RenderLayer(),
    };
    displayViewSize = {
        width: 16,
        height: 9,
    };
    debugInfo: DebugInfo;
    constructor(app: Application, debugInfo: DebugInfo) {
        this.debugInfo = debugInfo;
        this.app = app;
        this.root = new Container();
        this.app.stage.addChild(this.root);
        this.backgroundGrid = new TilingSprite({
            texture: getTexture("grid.png"),
            width: this.app.screen.width,
            height: this.app.screen.height,
        });
        this.app.stage.addChildAt(this.layers.floor, 0);
        this.app.stage.addChildAt(this.layers.background, 1);
        this.app.stage.addChildAt(this.layers.foreground, 2);
        this.app.stage.addChildAt(this.layers.sky, 3);
        this.layers.floor.attach(this.backgroundGrid);
        this.backgroundGrid.alpha = 0.5;
        this.app.stage.addChild(this.backgroundGrid);
    }
    static async create(debugInfo: DebugInfo): Promise<Display> {
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

        const display = new Display(app, debugInfo);

        return display;
    }
    init(world: World, playerState: PlayerState) {
        this.app.ticker.add((ticker) => {
            if (!world.clientPlayerExists()) return;

            const ratio = window.innerWidth / window.innerHeight;

            let scaleFactor: number;
            if (ratio > 16 / 9) {
                scaleFactor = window.innerHeight / this.displayViewSize.height;
            } else {
                // taller than 16/9
                // ignore north-south borders
                scaleFactor = window.innerWidth / this.displayViewSize.width;
            }
            
            world.entities.forEach((entity) => {
                if (entity.sprite.parent !== this.root) {
                    this.root.addChild(entity.sprite);
                }
                entity.updateSprite(scaleFactor);
                
            });
            this.debugInfo.renderedEntitiesCount = world.entities.size;
            // center camera on player
            const playerEntity = world.getClientPlayer()!;
            const playerSpritePos = playerEntity.sprite.position;
            this.root.position.x =
                this.app.screen.width / 2 - playerSpritePos.x;
            this.root.position.y =
                this.app.screen.height / 2 - playerSpritePos.y;
            this.backgroundGrid.tilePosition.x = 32 - (playerSpritePos.x % 32);
            this.backgroundGrid.tilePosition.y = 32 - ( playerSpritePos.y % 32);
            this.backgroundGrid.width = this.app.screen.width;
            this.backgroundGrid.height = this.app.screen.height;
        });
    }
}
