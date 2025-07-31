use bevy::prelude::*;

#[derive(Debug, Component)]
pub enum Gun {
    AutomaticRifle
}

#[derive(Component, Debug)]
pub struct Gunner {
    pub loaded_bullets: usize,
    pub last_shoot_timestamp: u64,
    pub reload_start_timestamp: Option<u64>,
}