use bevy::prelude::*;

use crate::{display::player::player_components};

pub fn spawn_entity_sprites(
    mut commands: Commands,
    q_entities: Query<(Entity, &EntityType), Added<EntityType>>,
    assets: Res<AssetServer>,
) {
    for (entity, entity_type) in q_entities {
        match &*entity_type {
            EntityType::Bullet(bullet) => {
                let mut sprite = Sprite::from_image(assets.load("bullet1.png"));
                sprite.custom_size = Some(vec2(0.2, 0.2));
                commands
                    .entity(entity)
                    .insert((sprite, Name::new("bullet")));
            }
            EntityType::Gunner(gunner) => {
                commands
                    .entity(entity)
                    .insert((player_components(&assets), Name::new("gunner")));
            }
            EntityType::Mage(mage) => {
                commands
                    .entity(entity)
                    .insert((player_components(&assets), Name::new("mage")));
            }
            EntityType::Bush(bush) => {
                let mut sprite = Sprite::from_image(assets.load("bush1.png"));
                sprite.custom_size = Some(vec2(1.0, 1.0));
                commands.entity(entity).insert((sprite, Name::new("bush")));
            }
            EntityType::Rock(rock) => {
                let mut sprite = Sprite::from_image(assets.load("rock1.png"));
                sprite.custom_size = Some(vec2(1.0, 1.0));
                commands.entity(entity).insert((sprite, Name::new("rock")));
            }
            EntityType::Tree(tree) => {
                let mut sprite = Sprite::from_image(assets.load("tree1.png"));
                sprite.custom_size = Some(vec2(1.0, 1.0));
                commands.entity(entity).insert((sprite, Name::new("tree")));
            }
        }
    }
}
