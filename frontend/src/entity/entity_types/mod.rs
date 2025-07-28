use bevy::prelude::*;

use crate::{
    entity::{ EntityID, collider::Collider},
    protobuf_codegen::server_packet::{
        Entity as PacketEntity, entity::EntityType as PacketEntityType,
    },
};
pub use environment::*;
pub use player::*;
pub use projectiles::*;
mod environment;
mod player;
mod projectiles;