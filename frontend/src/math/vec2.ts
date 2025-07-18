export type Vec2 = Float64Array;

const vec2Funcs = Object.freeze({
    __proto__: null,
    add,
    fromAngle,
    toPoint,
    subtract,
    scale,
    normalize,
    distance,
    dot,
    magnitude,
    lerp,
    eq,
    angle,
    ZERO: new Float64Array([0, 0]) as Vec2
});

type Vec2FnType = ((point: { x: number; y: number }) => Vec2) &
    ((x: number, y?: number) => Vec2) &
    typeof vec2Funcs;
const vec2: Vec2FnType = ((
    xOrPoint: { x: number; y: number } | number,
    y?: number,
): Vec2 => {
    if (typeof xOrPoint === "object") {
        let { x, y } = xOrPoint;
        return new Float64Array([x, y]);
    }
    return new Float64Array([xOrPoint, y ?? xOrPoint]);
}) as Vec2FnType;
Object.assign(vec2, vec2Funcs);

function fromAngle(angle: number, length = 1): Vec2 {
    return vec2(Math.cos(angle) * length, Math.sin(angle) * length);
}
function toPoint([x, y]: Vec2): { x: number; y: number } {
    return {
        x,
        y,
    };
}
function eq(a: Vec2, b: Vec2): boolean {
    return (
        Math.abs(a[0] - b[0]) < Number.EPSILON &&
        Math.abs(a[1] - b[1]) < Number.EPSILON
    );
}
function add(a: Vec2, b: Vec2, out: Vec2 = vec2(0)): Vec2 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

function subtract(a: Vec2, b: Vec2, out: Vec2 = vec2(0)): Vec2 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

function scale(a: Vec2, scalar: number, out: Vec2 = vec2(0)): Vec2 {
    out[0] = a[0] * scalar;
    out[1] = a[1] * scalar;
    return out;
}

function magnitude(a: Vec2): number {
    return Math.hypot(a[0], a[1]);
}

function normalize(a: Vec2, out: Vec2 = vec2(0)): Vec2 {
    const mag = magnitude(a);
    if (mag === 0) {
        out[0] = 0;
        out[1] = 0;
    } else {
        out[0] = a[0] / mag;
        out[1] = a[1] / mag;
    }
    return out;
}

function dot(a: Vec2, b: Vec2): number {
    return a[0] * b[0] + a[1] * b[1];
}

function distance(a: Vec2, b: Vec2): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.hypot(dx, dy);
}

function lerp(a: Vec2, b: Vec2, t: number, out: Vec2 = vec2(0)): Vec2 {
    out[0] = a[0] + (b[0] - a[0]) * t;
    out[1] = a[1] + (b[1] - a[1]) * t;
    return out;
}

export function rotate(a: Vec2, angleRad: number, out: Vec2 = vec2(0)): Vec2 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const x = a[0],
        y = a[1];
    out[0] = x * cos - y * sin;
    out[1] = x * sin + y * cos;
    return out;
}

export function angle(a: Vec2): number {
    return Math.atan2(a[1], a[0]);
}

export function angleBetween(a: Vec2, b: Vec2): number {
    const dotProd = dot(a, b);
    const magA = magnitude(a);
    const magB = magnitude(b);
    return Math.acos(Math.min(Math.max(dotProd / (magA * magB), -1), 1));
}

export function invert(a: Vec2, out: Vec2 = vec2(0)): Vec2 {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

export { vec2 };
