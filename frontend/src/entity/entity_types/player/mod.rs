pub mod display;
pub mod gunner;
pub mod mage;

use std::{any::Any, time::Duration};

use bevy::prelude::*;

use crate::{
    display::layer::Layer,
    entity::entity_types::{
        display::{LeftHand, RightHand},
        gunner::Gunner,
        mage::{Mage, MageHeldItem},
    },
    packet::entity::{EntitySpawn, GunnerSpawn, MageSpawn},
};

#[derive(Component, Default, Debug)]
pub struct Player {
    pub name: String,
}

#[derive(Component, Debug, Deref, DerefMut, Reflect)]
pub struct Health(pub f32);