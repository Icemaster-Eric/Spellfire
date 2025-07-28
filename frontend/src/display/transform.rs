use bevy::{prelude::*};

use crate::{entity::collider::{Collider, Position, Rotation}, util::rand::rand_float};


pub fn collider_to_transform(q_colliders_transforms: Query<(&Position, &Rotation, &mut Transform)>) {
    for (position, rotation, mut transform) in q_colliders_transforms {
        transform.translation = (*position).clone().extend(0.);
        transform.rotation = Quat::from_rotation_z(**rotation);
    }
}