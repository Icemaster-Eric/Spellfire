use bevy::prelude::*;

use crate::client::{self, ClientPlayer};

#[derive(Resource, Debug)]
pub enum CameraTarget {
    FollowingClient { offset: Vec2 },
    Static { at: Vec2 },
}