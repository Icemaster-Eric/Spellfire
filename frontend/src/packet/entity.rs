use std::mem;

use crate::entity::collider::{Collider, Shape};
use crate::packet::conv::conv_packet_vec2;
use crate::protobuf_codegen::server_packet::Gun as PacketGun;
use crate::protobuf_codegen::server_packet::collider::ColliderType as PacketColliderType;
use crate::protobuf_codegen::server_packet::entity::EntityType as PacketEntityType;
use crate::protobuf_codegen::server_packet::entity_attribute::EntityAttributeType as PacketEntityAttributeType;

use crate::entity::entity_types::*;
use crate::{
    connection::server_packets::PacketEntitiesSent,
    entity::{
        EntityID,
        collider::{Position, Velocity},
    },
    protobuf_codegen::{server_packet::Entity as PacketEntity, types::Vec2 as PacketVec2},
};
use bevy::ecs::bundle::{DynamicBundle, NoBundleEffect};
use bevy::platform::collections::HashSet;
use bevy::prelude::*;
use protobuf::Enum;

#[derive(Debug)]
pub enum EntityAttribute {
    Health(f64),
    Name(String),
    Gun(Gun),
    Damage(f64),
}
impl EntityAttribute {
    pub const VARIANTS_COUNT: usize = 4;
    pub const HEALTH_DISCRIM: usize = 0;
    pub const NAME_DISCRIM: usize = 1;
    pub const GUN_DISCRIM: usize = 2;
    pub const DAMAGE_DISCRIM: usize = 3;
}

pub fn spawn_packet_entity(packet_entity: &PacketEntity, commands: &mut Commands) {
    let mut entity = commands.spawn_empty();
    let shape = match packet_entity.collider.type_.enum_value_or_default() {
        PacketColliderType::COLLIDER_TYPE_UNSPECIFIED => panic!("no collider type specified"),
        PacketColliderType::POINT => Shape::Circle { radius: 0.01 },
        PacketColliderType::CIRCLE => Shape::Circle {
            radius: packet_entity.collider.radius as f32,
        },
        PacketColliderType::RECT => Shape::Rect {
            size: conv_packet_vec2(&packet_entity.collider.size),
        },
    };
    let mut attributes: [Option<EntityAttribute>; EntityAttribute::VARIANTS_COUNT] =
        [const { None }; 5];

    for attribute in &packet_entity.attributes {
        match attribute.type_.enum_value_or_default() {
            PacketEntityAttributeType::ENTITY_ATTRIBUTE_TYPE_UNSPECIFIED => {
                error!("packet entity attribute type is unspecified");
            }
            PacketEntityAttributeType::NAME => {
                attributes[EntityAttribute::NAME_DISCRIM]
                    .insert(EntityAttribute::Name(attribute.name.clone()));
            }
            PacketEntityAttributeType::HEALTH => {
                attributes[EntityAttribute::HEALTH_DISCRIM]
                    .insert(EntityAttribute::Health(attribute.health));
            }
            PacketEntityAttributeType::GUN => {
                let gun;
                match attribute.gun.enum_value_or_default() {
                    PacketGun::GUN_UNSPECIFIED => {
                        error!("gun unspecified");
                        gun = Gun::AutomaticRifle;
                    }
                    PacketGun::GUN_AUTOMATIC_RIFLE => {
                        gun = Gun::AutomaticRifle;
                    }
                }
                attributes[EntityAttribute::GUN_DISCRIM].insert(EntityAttribute::Gun(gun));
            }
            PacketEntityAttributeType::DAMAGE => {
                attributes[EntityAttribute::DAMAGE_DISCRIM].insert(EntityAttribute::Damage(attribute.damage));
            }
        }
    }
    let entity_type = match packet_entity.type_.enum_value_or_default() {
        PacketEntityType::ENTITY_TYPE_UNSPECIFIED => {
            panic!("unspecified entity type");
        }
        PacketEntityType::GUNNER => entity.insert(Gunner {
            current_gun: attributes[EntityAttribute::GUN_DISCRIM],
            loaded_bullets: 0, //attributes[EntityAttribute::Health(())],
            last_shoot_timestamp: 0,
            reload_start_timestamp: 0,
        }),
        PacketEntityType::MAGE => entity.insert(Mage {}),
        PacketEntityType::BULLET => entity.insert(Bullet {}),
        PacketEntityType::BUSH => entity.insert(Bush {}),
        PacketEntityType::TREE => entity.insert(Tree {}),
        PacketEntityType::ROCK => entity.insert(Rock {}),
        PacketEntityType::DEAD_BUSH => entity.insert(DeadBush {}),
        PacketEntityType::CACTUS => entity.insert(Cactus {}),
    };

    entity.insert(Collider::new(
        conv_packet_vec2(&packet_entity.collider.position),
        conv_packet_vec2(&packet_entity.collider.velocity),
        shape,
        packet_entity.collider.rotation as f32,
    ));
    entity.insert(EntityID(packet_entity.id));
}
