import type { Vec2 } from "./vec2";

export type AABB = [...Vec2, ...Vec2];

const aabbFuncs = {
    size,
    center,
    containsPoint,
    intersection,
    intersects,
    union,
};
type AABBFnType = ((pos: Vec2, size: Vec2) => AABB) & typeof aabbFuncs;
const aabb: AABBFnType = ((pos: Vec2, size: Vec2): AABB => {
    return [pos[0], pos[1], pos[0] + size[0], pos[1] + size[1]];
}) as AABBFnType;
Object.assign(aabb, aabbFuncs);

/**
 * Gets the width and height of an AABB.
 * @param aabb The AABB
 * @returns [width, height]
 */
function size(aabb: AABB): Vec2 {
    return [aabb[2] - aabb[0], aabb[3] - aabb[1]];
}

/**
 * Gets the center of an AABB.
 * @param aabb The AABB
 * @returns Center [x, y]
 */
function center(aabb: AABB): Vec2 {
    return [(aabb[0] + aabb[2]) / 2, (aabb[1] + aabb[3]) / 2];
}

/**
 * Checks if a point is inside an AABB.
 * @param aabb The AABB
 * @param point The point [x, y]
 * @returns True if inside, false otherwise
 */
function containsPoint(aabb: AABB, point: Vec2): boolean {
    return (
        point[0] >= aabb[0] &&
        point[0] <= aabb[2] &&
        point[1] >= aabb[1] &&
        point[1] <= aabb[3]
    );
}

/**
 * Checks if two AABBs overlap.
 * @param a First AABB
 * @param b Second AABB
 * @returns True if overlapping, false otherwise
 */
function intersects(a: AABB, b: AABB): boolean {
    return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
}

/**
 * Returns the intersection of two AABBs, or null if they do not overlap.
 * @param a First AABB
 * @param b Second AABB
 * @returns Intersection AABB or null
 */
function intersection(a: AABB, b: AABB): AABB | null {
    const minX = Math.max(a[0], b[0]);
    const minY = Math.max(a[1], b[1]);
    const maxX = Math.min(a[2], b[2]);
    const maxY = Math.min(a[3], b[3]);
    if (minX < maxX && minY < maxY) {
        return [minX, minY, maxX, maxY];
    }
    return null;
}

/**
 * Expands an AABB to include another AABB.
 * @param a First AABB
 * @param b Second AABB
 * @returns The union AABB
 */
function union(a: AABB, b: AABB): AABB {
    return [
        Math.min(a[0], b[0]),
        Math.min(a[1], b[1]),
        Math.max(a[2], b[2]),
        Math.max(a[3], b[3]),
    ];
}

export { aabb };
