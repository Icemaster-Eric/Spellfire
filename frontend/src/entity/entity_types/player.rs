use bevy::prelude::*;

#[derive(Component, Default)]
pub struct Player {
    name: String
}


#[derive(Debug, Hash, PartialEq, Eq, PartialOrd, Ord)]
pub enum Gun {
    AutomaticRifle
}
#[derive(Component, Debug)]
#[require(Player)]
pub struct Gunner {
    pub current_gun: Gun,
    pub loaded_bullets: usize,
    pub last_shoot_timestamp: u64,
    pub reload_start_timestamp: Option<u64>,
}

#[derive(Component, Debug)]
pub struct Mage {}
