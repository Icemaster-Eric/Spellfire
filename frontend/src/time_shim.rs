use bevy::{platform::time, prelude::*, time::{time_system, TimeUpdateStrategy}};
use wasm_timer::Instant;

fn shim_fixed_update_time(mut time_update_strategy: ResMut<TimeUpdateStrategy>) {
    *time_update_strategy = TimeUpdateStrategy::ManualInstant(time::Instant::now());
}

pub fn time_shim_plugin(app: &mut App) {
    app.add_systems(First, shim_fixed_update_time.before(time_system));
}