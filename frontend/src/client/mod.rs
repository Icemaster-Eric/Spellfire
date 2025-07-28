use bevy::prelude::*;

use crate::client::controls::move_client;
use crate::connection::server_packets::{InitializeEvent, PacketEntitiesSent};
use crate::entity::EntityID;
use crate::packet::update_world_from_received_packets;
pub mod controls;

#[derive(Component)]
#[component(storage = "SparseSet")]
#[require(
    Name = Name::new("Client Player")
)]
pub struct ClientPlayer;

pub fn client_plugin(app: &mut App) {
    app.add_systems(FixedUpdate, init_client_player.after(update_world_from_received_packets))
        .add_systems(FixedUpdate, move_client);
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
            error!("client id recieved does not match any entity");
        }
    }
}
