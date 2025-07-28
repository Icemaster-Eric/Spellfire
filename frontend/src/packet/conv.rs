use std::borrow::Borrow;

use bevy::prelude::*;

use crate::protobuf_codegen::types::Vec2 as PacketVec2;

pub fn conv_packet_vec2(packet_vec2: &PacketVec2) -> Vec2 {
    Vec2 {
        x: packet_vec2.x as f32,
        y: packet_vec2.y as f32,
    }
}
