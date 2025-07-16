import type { AABB } from "./aabb";
import type { Vec2 } from "./vec2";

export type Ray = { pos: Vec2, direction: Vec2 };

const rayFuncs = {
    __proto__: null
};
type RayFnType = ((pos: Vec2, direction: Vec2) => AABB) & typeof rayFuncs;
export const ray = (pos: Vec2, direction: Vec2): Ray => {
    return { pos, direction };
}
Object.assign(ray, rayFuncs);

