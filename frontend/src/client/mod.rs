use bevy::prelude::*;

use crate::client::controls::{aim_client, manage_menu_interfaces, move_client, shoot_client};
use crate::client::keybinds::Keybinds;
use crate::connection::server_packets::{InitializeEvent, PacketEntitiesSent};
use crate::entity::EntityID;
use crate::entity::entity_types::EntitySpawnSet;
use crate::packet::update_world_from_received_packets;
use crate::ui::actions::UIAction;
pub mod controls;
pub mod keybinds;

#[derive(Component)]
#[component(storage = "SparseSet")]
#[require(
    Name = Name::new("Client Player")
)]
pub struct ClientPlayer;

pub fn client_plugin(app: &mut App) {
    app.insert_resource(Keybinds::default())
        .add_systems(FixedUpdate, init_client_player.after(EntitySpawnSet))
        .add_event::<UIAction>()
        .add_systems(
            FixedUpdate,
            (move_client, aim_client, shoot_client, manage_menu_interfaces),
        );
}

pub fn init_client_player(
    mut init_event_reader: EventReader<InitializeEvent>,
    q_entities: Query<(Entity, &EntityID)>,
    mut commands: Commands,
) {
    for init_event in init_event_reader.read() {
        if let Some((client_entity, _)) = q_entities
            .iter()
            .find(|(_, id)| init_event.client_id == id.0)
        {
            commands.entity(client_entity).insert(ClientPlayer);
        } else {
            info!(
                "entity ids: {}",
                q_entities
                    .iter()
                    .map(|(_, id)| id.0.to_string())
                    .collect::<Vec<_>>()
                    .join(", ")
            );
            error!("client id received does not match any entity");
        }
    }
}
