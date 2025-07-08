export type Vec2 = [number, number];

const vec2Funcs = {
    add,
    fromAngle,
    toPoint,
    subtract,
    invert,
    hadamard,
    scale,
    angle,
    normalize,
    distance,
    dot,
    length,
    rotate,
    reflect,
    perpendicular,
    project,
    lerp,
};

type Vec2FnType = ((point: { x: number; y: number }) => Vec2) &
    ((x: number, y?: number) => Vec2) &
    typeof vec2Funcs;
const vec2: Vec2FnType = ((
    xOrPoint: { x: number; y: number } | number,
    y?: number,
): Vec2 => {
    if (typeof xOrPoint === "object") {
        let { x, y } = xOrPoint;
        return [x, y];
    }
    return [xOrPoint, y ?? xOrPoint];
}) as Vec2FnType;
Object.assign(vec2, vec2Funcs);

function fromAngle(angle: number, length = 1): Vec2 {
    return [Math.cos(angle) * length, Math.sin(angle) * length];
}
function toPoint([x, y]: Vec2): { x: number; y: number } {
    return {
        x,
        y,
    };
}
function add(a: Vec2, b: Vec2): Vec2 {
    return [a[0] + b[0], a[1] + b[1]];
}

function subtract(a: Vec2, b: Vec2): Vec2 {
    return [a[0] - b[0], a[1] - b[1]];
}

function hadamard(a: Vec2, b: Vec2): Vec2 {
    return [a[0] * b[0], a[1] * b[1]];
}

function invert(a: Vec2): Vec2 {
    return [1/ a[0], 1/a[1]];
}

function scale(a: Vec2, scalar: number): Vec2 {
    return [a[0] * scalar, a[1] * scalar];
}

function angle(v: Vec2): number {
    return Math.atan2(v[1], v[0]);
}

function normalize(v: Vec2): Vec2 {
    const length = Math.hypot(v[0], v[1]);
    return length === 0 ? [0, 0] : [v[0] / length, v[1] / length];
}

function distance(a: Vec2, b: Vec2): number {
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
}
function dot(a: Vec2, b: Vec2): number {
    return a[0] * b[0] + a[1] * b[1];
}

function length(v: Vec2): number {
    return Math.hypot(v[0], v[1]);
}

function rotate(v: Vec2, radians: number): Vec2 {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return [v[0] * cos - v[1] * sin, v[0] * sin + v[1] * cos];
}

function reflect(v: Vec2, normal: Vec2): Vec2 {
    const d = dot(v, normal);
    return subtract(v, scale(normal, 2 * d));
}

function perpendicular(v: Vec2): Vec2 {
    return [-v[1], v[0]];
}

function project(v: Vec2, onto: Vec2): Vec2 {
    const ontoNorm = normalize(onto);
    const dotProd = dot(v, ontoNorm);
    return scale(ontoNorm, dotProd);
}

function lerp(a: Vec2, b: Vec2, t: number): Vec2 {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export { vec2 };
