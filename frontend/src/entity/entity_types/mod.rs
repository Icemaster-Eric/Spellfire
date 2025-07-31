use bevy::{ecs::spawn, prelude::*};

use crate::{
    entity::{ collider::Collider, entity_types::mage::spawning::spawn_mages, EntityID}, packet::update_world_from_received_packets, protobuf_codegen::server_packet::{
        entity::EntityType as PacketEntityType, Entity as PacketEntity
    }
};
pub use environment::*;
pub use player::*;
pub use projectiles::*;
mod environment;
mod player;
mod projectiles;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, SystemSet)]
pub struct EntitySpawnSet;

pub fn entity_spawning_plugin(app: &mut App) {
    app
        .add_systems(
            FixedUpdate,
            (
                spawn_mages,
                spawn_bushes,
                spawn_trees,
                spawn_rocks,
                spawn_bushes,
                spawn_dead_bushes,
                spawn_cacti,
            ).in_set(EntitySpawnSet).after(update_world_from_received_packets),
        );

}