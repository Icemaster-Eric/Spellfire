use bevy::prelude::*;
use std::ops::*;

#[derive(Component)]
pub struct Layer(f32);

impl Deref for Layer {
    type Target = f32;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
impl Layer {
    pub const BACKGROUND: Layer = Layer(0.);
    pub const LOW: Layer = Layer(1.);
    pub const BELOW_PLAYER: Layer = Layer(2.);
    pub const PLAYER: Layer = Layer(3.);
    pub const ABOVE_PLAYER: Layer = Layer(4.);
    pub const HIGH: Layer = Layer(5.);
    pub const SKY: Layer = Layer(6.);
}
pub fn layer_to_transform(transforms_to_change: Query<(&mut Transform, &Layer)>) {
    for (mut transform, layer) in transforms_to_change {
        transform.translation.z = **layer;
    }
}