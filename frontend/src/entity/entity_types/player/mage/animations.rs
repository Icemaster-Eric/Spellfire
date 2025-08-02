use std::time::Duration;

use crate::{
    entity::entity_types::{
        display::{HeldItemAnimations, InitialHeldItemRenderState},
        mage::{Mage, MageHeldItem},
    },
};
use bevy::prelude::*;

pub fn default_positions() -> InitialHeldItemRenderState {
    InitialHeldItemRenderState {
        left_hand: Transform::from_xyz(0., 0., 0.),
        right_hand: Transform::from_xyz(0., 0., 0.),
        held_item: Transform::from_xyz(0., 0., 0.),
    }
}
/*
pub fn on_fire_anims() -> HeldItemAnimations {
    HeldItemAnimations {
        left_hand: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TransformPositionLens {
                start: vec3(0., 0., 0.),
                end: vec3(1., 1., 0.),
            },
        )
        .into(),
        right_hand: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TransformPositionLens {
                start: vec3(0., 0., 0.),
                end: vec3(-1., -1., 0.),
            },
        )
        .into(),
        held_item: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TransformPositionLens {
                start: vec3(0., 0., 0.),
                end: vec3(0., 0., 0.),
            },
        )
        .into(),
    }
}
pub fn on_fire_end_anims() -> HeldItemAnimations {
    HeldItemAnimations {
        left_hand: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TweenToTargetTranslationLens::new(vec3(0., 0., 0.)),
        )
        .into(),
        right_hand: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TweenToTargetTranslationLens::new(vec3(0., 0., 0.)),
        )
        .into(),
        held_item: Tween::new(
            EaseFunction::Linear,
            Duration::from_millis(800),
            TweenToTargetTranslationLens::new(vec3(0., 0., 0.)),
        )
        .into(),
    }
}
*/