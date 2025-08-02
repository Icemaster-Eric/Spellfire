use bevy::{ecs::system::SystemParam, platform::collections::HashMap, prelude::*};
use bimap::BiHashMap;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Action {
    MoveN = 0,
    MoveE,
    MoveS,
    MoveW,
    Fire,
    SelectSlot1,
    SelectSlot2,
    SelectSlot3,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Input {
    Key(KeyCode),
    Mouse(MouseButton),
}

impl From<KeyCode> for Input {
    fn from(key: KeyCode) -> Self {
        Input::Key(key)
    }
}
impl From<MouseButton> for Input {
    fn from(button: MouseButton) -> Self {
        Input::Mouse(button)
    }
}
#[derive(SystemParam)]
pub struct InputMethods<'w> {
    keys: Res<'w, ButtonInput<KeyCode>>,
    mouse: Res<'w, ButtonInput<MouseButton>>,
}
impl<'w> InputMethods<'w> {
    pub fn is_pressed(&self, input: Input) -> bool {
        match input {
            Input::Key(key) => self.keys.pressed(key),
            Input::Mouse(button) => self.mouse.pressed(button),
        }
    }
    pub fn is_just_pressed(&self, input: Input) -> bool {
        match input {
            Input::Key(key) => self.keys.just_pressed(key),
            Input::Mouse(button) => self.mouse.just_pressed(button),
        }
    }
}

#[derive(Resource)]
pub struct Keybinds {
    bindings: BiHashMap<Input, Action>,
}
impl Keybinds {
    pub fn get_action_from_input(&self, input: Input) -> Option<Action> {
        self.bindings.get_by_left(&input).cloned()
    }
    pub fn get_input_from_action(&self, action: Action) -> Option<Input> {
        self.bindings.get_by_right(&action).cloned()
    }
    pub fn set_binding(&mut self, input: Input, action: Action) {
        self.bindings.insert(input, action);
    }
    
}

impl Default for Keybinds {
    fn default() -> Self {
        Self {
            bindings: BiHashMap::from_iter([
                (KeyCode::KeyW.into(), Action::MoveN),
                (KeyCode::KeyA.into(), Action::MoveW),
                (KeyCode::KeyS.into(), Action::MoveS),
                (KeyCode::KeyD.into(), Action::MoveE),
                (KeyCode::Digit1.into(), Action::SelectSlot1),
                (KeyCode::Digit2.into(), Action::SelectSlot2),
                (KeyCode::Digit3.into(), Action::SelectSlot3),
                (MouseButton::Left.into(), Action::Fire)
            ]),
        }
    }
}
