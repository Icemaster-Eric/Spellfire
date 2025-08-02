pub mod display;
pub mod animations;
pub mod spawning;

use std::time::Duration;

use bevy::prelude::*;

use crate::entity::entity_types::{display::{
    HeldItemAnimations, InitialHeldItemRenderState,
}};

#[derive(Event)]
pub enum MageAction {
    Fire
}
#[derive(Component, Debug)]
pub struct Mage {}

#[derive(Component, Debug)]
pub enum MageHeldItem {
    Staff {},
}