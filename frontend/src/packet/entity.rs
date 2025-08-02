use std::mem;

use crate::entity::collider::{Collider, Shape};
use crate::entity::entity_types::gunner::Gun;
use crate::entity::entity_types::*;
use crate::packet::conv::conv_packet_vec2;
use crate::protobuf_codegen::server_packet::Gun as PacketGun;
use crate::protobuf_codegen::server_packet::render_data::Sprite as PacketSprite;
use crate::protobuf_codegen::server_packet::collider::ColliderType as PacketColliderType;
use crate::protobuf_codegen::server_packet::entity::EntityType as PacketEntityType;
use crate::protobuf_codegen::server_packet::entity_attribute::EntityAttributeType as PacketEntityAttributeType;
use crate::{
    connection::server_packets::PacketEntitiesSent,
    entity::{
        EntityID,
        collider::{Position, Velocity},
    },
    protobuf_codegen::{server_packet::Entity as PacketEntity, types::Vec2 as PacketVec2},
};
use bevy::ecs::bundle::{DynamicBundle, NoBundleEffect};
use bevy::ecs::query::QueryData;
use bevy::ecs::system::SystemParam;
use bevy::platform::collections::HashSet;
use bevy::prelude::*;
use protobuf::Enum;

#[derive(Debug, Default)]
pub struct PossibleEntityAttributes {
    health: Option<f64>,
    name: Option<String>,
    gun: Option<Gun>,
    damage: Option<f64>,
}

#[derive(SystemParam)]
pub struct EntitySpawnEventWriters<'w> {
    gunner: EventWriter<'w, EntitySpawn<GunnerSpawn>>,
    mage: EventWriter<'w, EntitySpawn<MageSpawn>>,
    bullet: EventWriter<'w, EntitySpawn<BulletSpawn>>,
    bush: EventWriter<'w, EntitySpawn<BushSpawn>>,
    tree: EventWriter<'w, EntitySpawn<TreeSpawn>>,
    rock: EventWriter<'w, EntitySpawn<RockSpawn>>,
    dead_bush: EventWriter<'w, EntitySpawn<DeadBushSpawn>>,
    cactus: EventWriter<'w, EntitySpawn<CactusSpawn>>,
}

#[derive(Event)]
pub struct EntitySpawn<T> {
    pub spawn_data: T,
    pub entity_id: u32,
    pub position: Vec2,
    pub velocity: Vec2,
    pub rotation: f32,
    pub shape: Shape,
    pub sprite_variant: u8,
    pub sprite_size: f32,
}

pub struct GunnerSpawn {
    pub name: String,
    pub health: f32,
}

pub struct MageSpawn {
    pub name: String,
    pub health: f32,
}

pub struct BulletSpawn {
    pub damage: f32,
}

pub struct BushSpawn {}

pub struct TreeSpawn {}

pub struct RockSpawn {}
pub struct DeadBushSpawn {}
pub struct CactusSpawn {}

pub fn spawn_packet_entity(
    packet_entity: &PacketEntity,
    entity_spawn_event_writers: &mut EntitySpawnEventWriters,
) {
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
    let mut possible_attributes = PossibleEntityAttributes::default();

    for attribute in &packet_entity.attributes {
        match attribute.type_.enum_value_or_default() {
            PacketEntityAttributeType::ENTITY_ATTRIBUTE_TYPE_UNSPECIFIED => {
                error!("packet entity attribute type is unspecified");
            }
            PacketEntityAttributeType::NAME => {
                let _ = possible_attributes.name.insert(attribute.name.clone());
            }
            PacketEntityAttributeType::HEALTH => {
                let _ = possible_attributes.health.insert(attribute.health);
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
                let _ = possible_attributes.gun.insert(gun);
            }
            PacketEntityAttributeType::DAMAGE => {
                let _ = possible_attributes.damage.insert(attribute.damage);
            }
            PacketEntityAttributeType::SPELL_1_LAST_FIRE => {}
            PacketEntityAttributeType::SPELL_2_LAST_FIRE => {}
            PacketEntityAttributeType::SPELL_3_LAST_FIRE => {}
        }
    }
    let sprite_size = packet_entity.render_data.sprite_size as f32;
    let sprite_variant = match packet_entity.render_data.sprite.enum_value_or_default() {
        PacketSprite::SPRITE_UNSPECIFIED => {
            error!("sprite unspecified");
            1
        }
        PacketSprite::GUNNER => 1,
        PacketSprite::MAGE => 1,
        PacketSprite::BULLET_1 => 1,
        PacketSprite::BUSH_1 => 1,
        PacketSprite::TREE_1 => 1,
        PacketSprite::TREE_2 => 2,
        PacketSprite::ROCK_1 => 1,
        PacketSprite::ROCK_2 => 2,
        PacketSprite::ROCK_3 => 3,
        PacketSprite::ROCK_4 => 4,
        PacketSprite::DEAD_BUSH_1 => 1,
        PacketSprite::DEAD_BUSH_2 => 2,
        PacketSprite::CACTUS_1 => 1,
    };
    let position = conv_packet_vec2(&packet_entity.collider.position);
    let velocity = conv_packet_vec2(&packet_entity.collider.velocity);
    let rotation = packet_entity.collider.rotation as f32;
    let entity_id = packet_entity.id;

    match packet_entity.type_.enum_value_or_default() {
        PacketEntityType::ENTITY_TYPE_UNSPECIFIED => {
            panic!("unspecified entity type");
        }
        PacketEntityType::GUNNER => {
            entity_spawn_event_writers.gunner.write(EntitySpawn {
                spawn_data: GunnerSpawn {
                    name: possible_attributes.name.unwrap_or_else(|| "--no name specified--".to_string()),
                    health: possible_attributes.health.unwrap_or(9969.0) as f32,
                },
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::MAGE => {
            entity_spawn_event_writers.mage.write(EntitySpawn {
                spawn_data: MageSpawn {
                    name: possible_attributes.name.unwrap_or_else(|| "--no name specified--".to_string()),
                    health: possible_attributes.health.unwrap_or(9969.0) as f32,
                },
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::BULLET => {
            entity_spawn_event_writers.bullet.write(EntitySpawn {
                spawn_data: BulletSpawn {
                    damage: possible_attributes.damage.unwrap_or(0.0) as f32,
                },
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::BUSH => {
            entity_spawn_event_writers.bush.write(EntitySpawn {
                spawn_data: BushSpawn {},
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::TREE => {
            entity_spawn_event_writers.tree.write(EntitySpawn {
                spawn_data: TreeSpawn {},
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::ROCK => {
            entity_spawn_event_writers.rock.write(EntitySpawn {
                spawn_data: RockSpawn {},
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::DEAD_BUSH => {
            entity_spawn_event_writers.dead_bush.write(EntitySpawn {
                spawn_data: DeadBushSpawn {},
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
        PacketEntityType::CACTUS => {
            entity_spawn_event_writers.cactus.write(EntitySpawn {
                spawn_data: CactusSpawn {},
                entity_id,
                position,
                velocity,
                rotation,
                shape,
                sprite_variant,
                sprite_size,
            });
        }
    };
}
