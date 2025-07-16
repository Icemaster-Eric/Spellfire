import { vec2, type Vec2 } from "./vec2";

export type AABB = { position: Vec2; size: Vec2 };

const aabbFuncs = {
    __proto__: null,
    center,
    containsPoint,
    intersects,
};
type AABBFnType = ((position: Vec2, size: Vec2) => AABB) & typeof aabbFuncs;
const aabb: AABBFnType = ((position: Vec2, size: Vec2): AABB => {
    return { position, size };
}) as AABBFnType;
Object.assign(aabb, aabbFuncs);

/**
 * Gets the center of an AABB.
 * @param aabb The AABB
 * @returns Center [x, y]
 */
function center(aabb: AABB): Vec2 {
    return vec2(
        (aabb.position[0] + aabb.size[0]) / 2,
        (aabb.position[1] + aabb.size[1]) / 2,
    );
}

/**
 * Checks if a point is inside an AABB.
 * @param aabb The AABB
 * @param point The point [x, y]
 * @returns True if inside, false otherwise
 */
function containsPoint(aabb: AABB, point: Vec2): boolean {
    return (
        point[0] >= aabb.position[0] &&
        point[0] <= aabb.position[0] + aabb.size[0] &&
        point[1] >= aabb.position[1] &&
        point[1] <= aabb.position[1] + aabb.size[1]
    );
}

/**
 * Checks if two AABBs overlap.
 * @param a First AABB
 * @param b Second AABB
 * @returns True if overlapping, false otherwise
 */
function intersects(a: AABB, b: AABB): boolean {
    return (
        a.position[0] < b.position[0] + b.size[0] &&
        a.position[1] < b.position[1] + b.size[1] &&
        b.position[0] < a.position[0] + a.size[0] &&
        b.position[1] < a.position[1] + a.size[1]
    );
}

export { aabb };
