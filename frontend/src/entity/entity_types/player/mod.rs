pub mod display;
pub mod gunner;
pub mod mage;

use std::{any::Any, time::Duration};

use bevy::prelude::*;

use crate::{
    display::layer::Layer,
    entity::entity_types::{
        display::{HealthbarFill, LeftHand, RightHand},
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

pub fn update_health_bar(mut commands: Commands,/* q_changed_health_entities: Query<(&Health, Entity, &Children), (With<Player>, Changed<Health>)>, */q_healthbars: Query<(&mut Transform,), (With<HealthbarFill>)>) {
    /* 
    for (health, changed_health_player_entity, changed_health_player_children) in q_changed_health_entities {
        commands.entity(changed_health_player_entity);
    }*/
}