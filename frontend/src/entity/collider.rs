use bevy::prelude::*;

#[derive(Debug, Bundle)]
pub struct Collider {
    pub position: Position,
    pub velocity: Velocity,
    pub shape: Shape,
    pub rotation: Rotation
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
#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct Position(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct Velocity(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct Rotation(pub f32);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct LastTickPosition(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct LastTickVelocity(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct LastTickRotation(pub f32);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct RenderedPosition(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct RenderedRotation(pub f32);

#[derive(Debug, Deref, DerefMut, Component, Clone)]
pub struct RenderedVelocity(pub Vec2);

#[derive(Debug, Component, Clone)]
pub enum Shape {
    Circle { radius: f32 },
    Rect { size: Vec2 },
}

pub fn update_rendered_collider(fixed_time: Res<Time<Fixed>>, 
q_colliders: Query<(&Position, &Rotation, &Velocity, &LastTickPosition, &LastTickRotation, &LastTickVelocity, &mut RenderedPosition, &mut RenderedRotation, &mut RenderedVelocity)>) {
	for (pos, rot, vel, last_tick_pos, last_tick_rot, last_tick_vel, mut rendered_pos, mut rendered_rot, mut rendered_vel) in q_colliders {
		rendered_pos.0 = last_tick_pos.lerp(**pos, fixed_time.overstep_fraction());
		rendered_rot.0 = last_tick_rot.lerp(**rot, fixed_time.overstep_fraction());
		rendered_vel.0 = last_tick_vel.lerp(**vel, fixed_time.overstep_fraction());
	} 
}
pub fn update_last_tick_collider(q_colliders: Query<(&mut LastTickPosition, &mut LastTickRotation, &mut LastTickVelocity, &mut Position, &mut Rotation, &mut Velocity)>) {
	for (mut last_tick_pos, mut last_tick_rot, mut last_tick_vel, pos, rot, vel) in q_colliders {
		last_tick_pos.0 = pos.0;
		last_tick_rot.0 = rot.0;
		last_tick_vel.0 = vel.0;
	}
}
pub fn collider_to_transform(q_colliders_transforms: Query<(&RenderedPosition, &RenderedRotation, &mut Transform)>) {
    for (position, rotation, mut transform) in q_colliders_transforms {
        transform.translation = (*position).clone().extend(0.);
        transform.rotation = Quat::from_rotation_z(**rotation);
    }
}

pub fn collider_plugin(app: &mut App) {
    app.add_systems(
        PostUpdate,
        (
            update_rendered_collider,
        )
    ).add_systems(FixedUpdate, update_last_tick_collider).add_systems(PostUpdate, collider_to_transform);
}