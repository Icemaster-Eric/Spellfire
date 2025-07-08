import { Application, Container } from "pixi.js";
import type { GameState } from "../state/gameState";

export class Display {
    app: Application;
    root: Container;
    constructor(app: Application) {
        this.app = app;
        this.root = new Container();
        this.app.stage.addChild(this.root);
    }
    static async init(gameState: GameState): Promise<Display> {
        const app = new Application();
        await app.init({
            background: "red",
            resizeTo: window,
            autoDensity: true,
            antialias: true,
            canvas: document.getElementById("game")! as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
        });

        const display = new Display(app);
        display.app.ticker.add((ticker) => {
            if (!gameState.world.isInitialized()) return;
            gameState.world.entities.forEach((entity) => {
                display.root.addChild(entity.sprite);
                entity.updateSprite();
            });
            const playerEntity = gameState.world.getClientPlayer();
            const [x, y] = playerEntity.position;
            display.root.x = app.screen.width / 2 - x;
            display.root.y = app.screen.height / 2 - y;
        });
        return display;
    }
}