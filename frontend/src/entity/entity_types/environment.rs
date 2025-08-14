use bevy::prelude::*;

use crate::{display::layer::Layer, entity::{collider::{Position, Rotation, Velocity}, EntityID}, packet::entity::{BushSpawn, CactusSpawn, DeadBushSpawn, EntitySpawn, RockSpawn, TreeSpawn}};

#[derive(Component, Debug)]
pub struct Bush {}

pub fn spawn_bushes(
    mut bush_spawn_reader: EventReader<EntitySpawn<BushSpawn>>,
    mut commands: Commands,
    assets: Res<AssetServer>
) {
    for bush_spawn in bush_spawn_reader.read() {
        commands.spawn((
            Bush {},
            Position(bush_spawn.position),
            Velocity(bush_spawn.velocity),
            Rotation(bush_spawn.rotation),
            bush_spawn.shape.clone(),
            EntityID(bush_spawn.entity_id),
            Name::new("Bush"),
            Sprite {
                image: assets.load(format!("sprites/bush1.png")),
                custom_size: Some(Vec2::new(1., 1.)),
                ..Default::default()
            },
            Layer::ABOVE_PLAYER
        ));
    }
}

#[derive(Component, Debug)]
pub struct Tree {}

pub fn spawn_trees(
    mut tree_spawn_reader: EventReader<EntitySpawn<TreeSpawn>>,
    mut commands: Commands,
    assets: Res<AssetServer>,
) {
    for tree_spawn in tree_spawn_reader.read() {
        commands.spawn((
            Tree {},
            Position(tree_spawn.position),
            Velocity(tree_spawn.velocity),
            Rotation(tree_spawn.rotation),
            tree_spawn.shape.clone(),
            EntityID(tree_spawn.entity_id),
            Name::new("Tree"),
            Sprite {
                image: assets.load(format!("sprites/tree1.png")),
                custom_size: Some(Vec2::new(1., 1.)),
                ..Default::default()
            },
            Layer::ABOVE_PLAYER
        ));
    }
}
#[derive(Component, Debug)]
pub struct Rock {}

pub fn spawn_rocks(
    mut rock_spawn_reader: EventReader<EntitySpawn<RockSpawn>>,
    mut commands: Commands,
    assets: Res<AssetServer>,
) {
    for rock_spawn in rock_spawn_reader.read() {
        commands.spawn((
            Rock {},
            Position(rock_spawn.position),
            Velocity(rock_spawn.velocity),
            Rotation(rock_spawn.rotation),
            rock_spawn.shape.clone(),
            EntityID(rock_spawn.entity_id),
            Name::new("Rock"),
            Sprite {
                image: assets.load(format!("sprites/rock1.png")),
                custom_size: Some(Vec2::new(1., 1.)),
                ..Default::default()
            },
            Layer::ABOVE_PLAYER
        ));
    }
}

#[derive(Component, Debug)]
pub struct DeadBush {}

pub fn spawn_dead_bushes(
    mut dead_bush_spawn_reader: EventReader<EntitySpawn<DeadBushSpawn>>,
    mut commands: Commands,
    assets: Res<AssetServer>,
) {
    for dead_bush_spawn in dead_bush_spawn_reader.read() {
        commands.spawn((
            DeadBush {},
            Position(dead_bush_spawn.position),
            Velocity(dead_bush_spawn.velocity),
            Rotation(dead_bush_spawn.rotation),
            dead_bush_spawn.shape.clone(),
            EntityID(dead_bush_spawn.entity_id),
            Name::new("Dead Bush"),
            Sprite {
                image: assets.load(format!("sprites/deadBush1.png")),
                custom_size: Some(Vec2::new(1., 1.)),
                ..Default::default()
            },
            Layer::ABOVE_PLAYER
        ));
    }
}

#[derive(Component, Debug)]
pub struct Cactus {}

pub fn spawn_cacti(
    mut cactus_spawn_reader: EventReader<EntitySpawn<CactusSpawn>>,
    mut commands: Commands,
    assets: Res<AssetServer>,
) {
    for cactus_spawn in cactus_spawn_reader.read() {
        commands.spawn((
            Cactus {},
            Position(cactus_spawn.position),
            Velocity(cactus_spawn.velocity),
            Rotation(cactus_spawn.rotation),
            cactus_spawn.shape.clone(),
            EntityID(cactus_spawn.entity_id),
            Name::new("Cactus"),
            Sprite {
                image: assets.load(format!("sprites/cactus1.png")),
                custom_size: Some(Vec2::new(1., 1.)),
                ..Default::default()
            },
            Layer::ABOVE_PLAYER
        ));
    }
}
