# API.md

This is only concerning the websockets connection, which is to be hosted at at `./ws`
## Common Typedefs used

```ts
type Vec2 = {
    x: number,
    y: number
}
type EasingFunc = "linear" | "quadratic" | "sqrt"
type Velocity = { type: static, velocity: Vec2 }
    | { type: accel, initialVelocity: Vec2, currentAccelTick: number, accelTickDuration: number, targetVelocity: Vec2, easingFunc: EasingFunc }
type Shape = { type: circle, radius: number }
type EntityId = number
type EntityType = "rock" | "tree" | "player" | "bush"
type PlayerShootVariation = "primary" | "secondary" /* LMB or RMB */
type PlayerShootMode = "start" | "end"
type PlayerState = {
    shoot_state: {
        is_shooting: boolean,
        shoot_mode: PlayerShootMode,
        shoot_variation: PlayerShootVariation
    }
}
type BushState = {
    is_shaking: boolean,
    shake_duration: number, // shake stops at modulo of 5 ticks
}
type Entity = {
    id: EntityId,
    type: string,
    position: Vec2,
    rotation: number, // radians, 0 to 2pi
    velocity: Velocity,
    shape: Shape,
    attributes: Array<EntityAttributes>,
    state: null | PlayerState | MobState
}
```

## Message Structure

```ts
type Message = {
    timestamp: number, // UNIX
    packets: Array<Packet>
}
type Packet = {
    type: string,
    data: Record<string, any> /* same as map[string]any */
}
```

## Packets
They will be in the form of &lt;type>: &lt;data>

### Client Packets

```ts
enter_game: {}

type PlayerAction = { type: move, movement: Vec2 }
    | { type: attack,
        mode: "start" | "end",
        variation: "primary" | "secondary" /* LMB or RMB */ }

player_action: {
    action: PlayerAction
}
```

## Server Packets
```ts
initialize: {
    entities: Array<Entity>,
    player_id: EntityId,
}

update: {
    entities: Array<Entities> // todo: diffing
}
```
