use bevy::{prelude::*, render::mesh};

use crate::{display::layer::Layer, entity::{collider::{Position, Rotation, Velocity}, entity_types::{display::{HealthbarBackground, HealthbarFill, LeftHand, RightHand}, mage::MageHeldItem, Health}, EntityID}, packet::entity::{EntitySpawn, GunnerSpawn, MageSpawn}};

pub fn spawn_mages(
    assets: Res<AssetServer>,
    mut mage_spawn_reader: EventReader<EntitySpawn<MageSpawn>>,
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    for mage_spawn in mage_spawn_reader.read() {
        let mut entity: EntityCommands<'_> = commands.spawn_empty();
        entity.insert((
            Sprite {
                image: assets.load("sprites/playerBody1.png"),
                custom_size: Some(vec2(1.,  1.)),
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
                        image: assets.load("sprites/playerHand.png"),
                        custom_size: Some(vec2(0.3, 0.3)),
                        ..default()
                    },
                    Transform::from_xyz(0.5, 0.5, 0.),
                    Layer::BELOW_PLAYER
                ),
                // held item
                (
                    MageHeldItem::Staff {},
                    Name::new("Held Item"),
                    Sprite {
                        image: assets.load("sprites/staff1.png"),
                        custom_size: Some(vec2(0.8, 0.8)),
                        ..default()
                    },
                    Transform::from_xyz(0.5, -0.5, 0.),
                    Layer::BELOW_PLAYER
                ),
                // Right hand
                (
                    RightHand,
                    Name::new("Right Hand"),
                    Sprite {
                        image: assets.load("sprites/playerHand.png"),
                        custom_size: Some(vec2(0.3, 0.3)),
                        ..default()
                    },
                    Transform::from_xyz(0.5, -0.5, 0.),
                    Layer::BELOW_PLAYER
                ),
                // Healthbar bg
                (
                    HealthbarBackground,
                    Name::new("Health Bar"),
                    Mesh2d(meshes.add(Rectangle::new(2., 0.4))),
                    MeshMaterial2d(materials.add(ColorMaterial::from(Color::srgb(0.2, 0.3, 0.4)))),
                    Transform::from_xyz(0., 1., 0.),
                    Layer::TOP,
                    children![
                        // Healthbar health
                        (
                            HealthbarFill,
                            Name::new("Healthbar Fill"),
                            Layer::TOP,
                            Mesh2d(meshes.add(Rectangle::new(2., 0.4))),
                            MeshMaterial2d(materials.add(ColorMaterial::from(Color::srgb(0.8, 0.3, 0.3)))),
                            
                        )
                    ]
                )
            ],
        ));
    }
}