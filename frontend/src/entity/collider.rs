use bevy::prelude::*;

use crate::{client::ClientPlayer, entity::entity_types::EntitySpawnSet};

#[derive(Debug, Bundle)]
pub struct Collider {
    pub position: Position,
    pub velocity: Velocity,
    pub shape: Shape,
    pub rotation: Rotation,
}

impl Collider {
    pub fn new(position: Vec2, velocity: Vec2, shape: Shape, rotation: f32) -> Self {
        Collider {
            position: Position(position),
            velocity: Velocity(velocity),
            shape,
            rotation: Rotation(rotation),
        }
    }
}
#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct Position(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct Velocity(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct Rotation(pub f32);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct LastTickPosition(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct LastTickVelocity(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct LastTickRotation(pub f32);

#[derive(Debug, Deref, DerefMut, Resource, Clone, Reflect)]
pub struct LastTickTime(pub u64);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct RenderedPosition(pub Vec2);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct RenderedRotation(pub f32);

#[derive(Debug, Deref, DerefMut, Component, Clone, Reflect)]
pub struct RenderedVelocity(pub Vec2);

#[derive(Debug, Component, Clone, Reflect)]
pub enum Shape {
    Circle { radius: f32 },
    Rect { size: Vec2 },
}
pub fn add_collider_components(
    q_added_positions: Query<(&Position, Entity), Added<Position>>,
    q_added_velocities: Query<(&Velocity, Entity), Added<Velocity>>,
    q_added_rotations: Query<(&Rotation, Entity), Added<Rotation>>,
    mut commands: Commands,
) {
    for (position, entity) in q_added_positions.iter() {
        commands
            .entity(entity)
            .insert(LastTickPosition(**position))
            .insert(RenderedPosition(**position));
    }
    for (velocity, entity) in q_added_velocities.iter() {
        commands
            .entity(entity)
            .insert(LastTickVelocity(**velocity))
            .insert(RenderedVelocity(**velocity));
    }
    for (rotation, entity) in q_added_rotations.iter() {
        commands
            .entity(entity)
            .insert(LastTickRotation(**rotation))
            .insert(RenderedRotation(**rotation));
    }
}
pub fn update_rendered_collider(
    fixed_time: Res<Time<Fixed>>,
    q_colliders: Query<(
        &Position,
        &Rotation,
        &Velocity,
        &LastTickPosition,
        &LastTickRotation,
        &LastTickVelocity,
        &mut RenderedPosition,
        &mut RenderedRotation,
        &mut RenderedVelocity,
        Has<ClientPlayer>
    )>,
) {
    for (
        pos,
        rot,
        vel,
        last_tick_pos,
        last_tick_rot,
        last_tick_vel,
        mut rendered_pos,
        mut rendered_rot,
        mut rendered_vel,
        is_client
    ) in q_colliders
    {
        if is_client {
            rendered_pos.0 = **pos;
            rendered_rot.0 = **rot;
            rendered_vel.0 = **vel;
            continue;
        }
        rendered_pos.0 = last_tick_pos.lerp(**pos, fixed_time.overstep_fraction());
        rendered_rot.0 = last_tick_rot.lerp(**rot, fixed_time.overstep_fraction());
        rendered_vel.0 = last_tick_vel.lerp(**vel, fixed_time.overstep_fraction());
    }
}
pub fn collider_to_transform(
    q_colliders_transforms: Query<(&RenderedPosition, &RenderedRotation, &mut Transform)>,
) {
    for (position, rotation, mut transform) in q_colliders_transforms {
        transform.translation = (*position).clone().extend(0.);
        transform.rotation = Quat::from_rotation_z(**rotation);
    }
}

pub fn collider_plugin(app: &mut App) {
    app.add_systems(
        FixedPostUpdate,
        ((update_rendered_collider, collider_to_transform).chain(),),
    )
    .add_systems(FixedUpdate, add_collider_components.after(EntitySpawnSet));
}
