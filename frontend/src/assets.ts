import { Assets, Texture } from "pixi.js";

const assetNames: string[] = ["grid.png", "rock1.svg", "rock2.svg", "rock3.svg", "rock4.svg", "tree1.svg", "tree2.svg", "bush1.svg", "bullet1.svg"];
const assetFilePaths = assetNames.map(
    (assetName) => `/assets/${assetName}`,
);

Assets.backgroundLoad(assetFilePaths);

export async function loadAllAssets(): Promise<void> {
    return await Assets.load(
        assetNames.map((assetName) => ({
            alias: assetName,
            src: `/assets/${assetName}`,
        })),
    );
}
export function getTexture(assetName: string): Texture {
    return Texture.from(assetName);
}
