use bevy::{platform::collections::HashMap, prelude::*};
pub mod conv;
pub mod entity;
use crate::{
    connection::server_packets::{PacketEntitiesSent, send_server_events},
    entity::{
        EntityID,
        collider::{Position, Velocity},
    },
    packet::{
        conv::conv_packet_vec2,
        entity::{
            BulletSpawn, BushSpawn, CactusSpawn, DeadBushSpawn, EntitySpawn,
            EntitySpawnEventWriters, GunnerSpawn, MageSpawn, RockSpawn, TreeSpawn,
            spawn_packet_entity,
        },
    },
    protobuf_codegen::{server_packet::Entity as PacketEntity, types::Vec2 as PacketVec2},
};

pub fn update_world_from_received_packets(
    mut packet_entities_reader: EventReader<PacketEntitiesSent>,
    world_entities: Query<(Entity, &EntityID, &mut Velocity, &mut Position)>,
    mut commands: Commands,
    mut entity_spawn_event_writers: EntitySpawnEventWriters,
) {
    let Some(packet_entities) = packet_entities_reader.read().last() else {
        return;
    };
    let mut sent_entities: HashMap<EntityID, &PacketEntity> = HashMap::new();
    for packet_entity in &**packet_entities {
        sent_entities.insert(EntityID(packet_entity.id), packet_entity);
    }
    // update sent and despawn unsent entities
    for (entity, id, mut velocity, mut position) in world_entities {
        if let Some(packet_entity) = sent_entities.remove(id) {
            **position = conv_packet_vec2(&packet_entity.collider.position);
            **velocity = conv_packet_vec2(&packet_entity.collider.velocity);
        } else {
            commands.entity(entity).despawn();
        }
    }

    //trace!("spawning {}, updating {}, removing {}", sent_entities.len(), i.0, i.1);
    // spawn remaining sent entities, which are new
    for remaining_packet_entity in sent_entities.values() {
        spawn_packet_entity(remaining_packet_entity, &mut entity_spawn_event_writers);
    }
}

pub fn packet_plugin(app: &mut App) {
    app.add_event::<EntitySpawn<GunnerSpawn>>()
        .add_event::<EntitySpawn<MageSpawn>>()
        .add_event::<EntitySpawn<BulletSpawn>>()
        .add_event::<EntitySpawn<BushSpawn>>()
        .add_event::<EntitySpawn<TreeSpawn>>()
        .add_event::<EntitySpawn<RockSpawn>>()
        .add_event::<EntitySpawn<DeadBushSpawn>>()
        .add_event::<EntitySpawn<CactusSpawn>>()
        .add_systems(
            FixedPreUpdate,
            update_world_from_received_packets.after(send_server_events),
        );
}
