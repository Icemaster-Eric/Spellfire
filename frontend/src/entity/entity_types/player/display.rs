use bevy::prelude::*;

use crate::entity::entity_types::{mage::MageHeldItem, Player};

#[derive(Component)]
pub struct LeftHand;

#[derive(Component)]
pub struct RightHand;

pub struct InitialHeldItemRenderState {
    pub left_hand: Transform,
    pub right_hand: Transform,
    pub held_item: Transform,
}
pub struct HeldItemAnimations {
    pub left_hand: (),
    pub right_hand: (),
    pub held_item: (),
}

#[derive(Component)]
pub struct HealthbarBackground;

#[derive(Component)]
pub struct HealthbarFill;