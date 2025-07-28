use bevy::{platform::collections::HashMap, prelude::*};
pub mod conv;
pub mod entity;
use crate::{
    connection::server_packets::{PacketEntitiesSent, send_server_events},
    entity::{
        EntityID,
        collider::{Position, Velocity},
    },
    packet::{conv::conv_packet_vec2, entity::spawn_packet_entity},
    protobuf_codegen::{server_packet::Entity as PacketEntity, types::Vec2 as PacketVec2},
};

pub fn update_world_from_received_packets(
    mut packet_entities_reader: EventReader<PacketEntitiesSent>,
    world_entities: Query<(Entity, &EntityID, &mut Velocity, &mut Position)>,
    mut commands: Commands,
) {
    let Some(packet_entities) = packet_entities_reader.read().last() else {
        return;
    };
    let mut sent_entities: HashMap<EntityID, &PacketEntity> = HashMap::new();
    for packet_entity in &**packet_entities {
        sent_entities.insert(EntityID(packet_entity.id), packet_entity);
    }
    let mut i = (0, 0);
    // update sent and despawn unsent entities
    for (entity, id, mut velocity, mut position) in world_entities {
        if let Some(packet_entity) = sent_entities.remove(id) {
            **position = conv_packet_vec2(&packet_entity.collider.position);
            **velocity = conv_packet_vec2(&packet_entity.collider.velocity);
            i.0 += 1;
        } else {
            commands.entity(entity).despawn();
            i.1 += 1;
        }
    }

    //trace!("spawning {}, updating {}, removing {}", sent_entities.len(), i.0, i.1);
    // spawn remaining sent entities, which are new
    for remaining_packet_entity in sent_entities.values() {
        spawn_packet_entity(remaining_packet_entity, &mut commands);
    }
}

pub fn packet_plugin(app: &mut App) {
    app.add_systems(
        FixedUpdate,
        update_world_from_received_packets.after(send_server_events),
    );
}
