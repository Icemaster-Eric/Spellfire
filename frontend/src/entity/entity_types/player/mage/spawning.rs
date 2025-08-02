use bevy::prelude::*;

use crate::{display::layer::Layer, entity::{collider::{Position, Rotation, Velocity}, entity_types::{display::{LeftHand, RightHand}, mage::MageHeldItem, Health}, EntityID}, packet::entity::{EntitySpawn, GunnerSpawn, MageSpawn}};

pub fn spawn_mages(
    assets: Res<AssetServer>,
    mut mage_spawn_reader: EventReader<EntitySpawn<MageSpawn>>,
    mut commands: Commands,
) {
    for mage_spawn in mage_spawn_reader.read() {
        let mut entity: EntityCommands<'_> = commands.spawn_empty();
        entity.insert((
            Sprite {
                image: assets.load("playerBody1.png"),
                custom_size: Some(vec2(0.3, 0.3)),
                ..default()
            },
            Layer::PLAYER,
            Name::new("Mage"),
            Health(mage_spawn.spawn_data.health),
            Position(mage_spawn.position),
            Velocity(mage_spawn.velocity),
            Rotation(mage_spawn.rotation),
            EntityID(mage_spawn.entity_id),
            children![
                // Left hand
                (
                    LeftHand,
                    Name::new("Left Hand"),
                    Sprite {
                        image: assets.load("playerHand.png"),
                        custom_size: Some(vec2(0.3, 0.3)),
                        ..default()
                    },
                    Transform::from_xyz(1., 1., 0.),
                ),
                // held item
                (
                    MageHeldItem::Staff {},
                    Name::new("Held Item"),
                    Sprite {
                        image: assets.load("staff1.png"),
                        custom_size: Some(vec2(0.5, 1.)),
                        ..default()
                    },
                    Transform::from_xyz(2., -2., 0.),
                ),
                // Right hand
                (
                    RightHand,
                    Name::new("Right Hand"),
                    Sprite {
                        image: assets.load("playerHand.png"),
                        custom_size: Some(vec2(0.3, 0.3)),
                        ..default()
                    },
                    Transform::from_xyz(-1., -1., 0.),
                )
            ],
        ));
    }
}