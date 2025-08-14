
use bevy::{asset::AssetMetaCheck, input::{common_conditions::{input_pressed, input_toggle_active}, mouse::MouseMotion}, prelude::*, time::TimeUpdateStrategy, window::PresentMode};
use bevy_framepace::FramepacePlugin;
use bevy_hanabi::prelude::*;
use bevy_tween::DefaultTweenPlugins;
use bevy_web_keepalive::WebKeepalivePlugin;
use iyes_perf_ui::prelude::*;
use wasm_timer::Instant;

use crate::{
    client::client_plugin, connection::ConnectionPlugin, display::{camera::camera_plugin, display_plugin}, entity::entity_plugin, packet::packet_plugin, physics::physics_plugin, time_shim::time_shim_plugin, ui::ui_plugin
};
pub mod client;
mod connection;
pub mod display;
pub mod entity;
mod util;
pub mod packet;
pub mod physics;
pub mod protobuf_codegen;
pub mod world;
pub mod time_shim;
pub mod ui;
use bevy_inspector_egui::{bevy_egui::EguiPlugin, quick::WorldInspectorPlugin};
use bevy::winit::{WinitSettings, UpdateMode};

pub fn main() {
    println!("hi");

    App::new()
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                canvas: Some("#game".into()),
                fit_canvas_to_parent: true,
                present_mode: PresentMode::Fifo,
                ..default()
            }),
            ..default()
        }).set(AssetPlugin {
            meta_check: AssetMetaCheck::Never,
            ..default()
        }))
        .insert_resource(WinitSettings {
            focused_mode: UpdateMode::Continuous,
            unfocused_mode: UpdateMode::Continuous,
        })
        .add_plugins(WebKeepalivePlugin {
            wake_delay: 1000. / 60.
        })
        .add_plugins(DefaultTweenPlugins)
        .add_plugins(HanabiPlugin)
        //.add_plugins(FramepacePlugin)
        .add_plugins(camera_plugin)
        .add_plugins(physics_plugin)
        .add_plugins(client_plugin)
        .add_plugins(packet_plugin)
        .add_plugins(display_plugin)
        .add_plugins(entity_plugin)
        .add_plugins(ui_plugin)
        .add_plugins(ConnectionPlugin::new(
            "https://spellfire-backend.hutao.rip/ws?guest=true",
        ))
        .add_plugins(bevy::diagnostic::FrameTimeDiagnosticsPlugin::default())
        .add_plugins(bevy::diagnostic::EntityCountDiagnosticsPlugin)
        .add_plugins(bevy::diagnostic::SystemInformationDiagnosticsPlugin)
        .add_plugins(bevy::render::diagnostic::RenderDiagnosticsPlugin)
        .add_plugins(PerfUiPlugin)
        .add_systems(Startup, spawn_perf_ui)
        .add_plugins(EguiPlugin::default())
        .add_plugins(WorldInspectorPlugin::new().run_if(input_toggle_active(false, KeyCode::Backquote)))
        .insert_resource(Time::<Fixed>::from_seconds(1. / 20.))
        .add_plugins(time_shim_plugin)
        .run();
}

fn spawn_perf_ui(mut commands: Commands, mut is_shown: Local<Option<bool>>) {
    let is_shown = is_shown.get_or_insert(false);
    commands.spawn(PerfUiDefaultEntries::default());
}
fn show_perf_ui() {

}