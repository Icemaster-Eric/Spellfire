use bevy::prelude::*;

#[derive(Debug, Bundle)]
pub struct Collider {
    position: Position,
    velocity: Velocity,
    shape: Shape,
    rotation: Rotation
}

impl Collider {
    pub fn new(position: Vec2, velocity: Vec2, shape: Shape, rotation: f32) -> Self {
        Collider {
            position: Position(position),
            velocity: Velocity(velocity),
            shape,
            rotation: Rotation(rotation)
        }
    }
}
#[derive(Debug, Deref, DerefMut, Component)]
pub struct Position(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component)]
pub struct Velocity(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component)]
pub struct Rotation(pub f32);

#[derive(Debug, Component)]
pub enum Shape {
    Circle { radius: f32 },
    Rect { size: Vec2 },
}
