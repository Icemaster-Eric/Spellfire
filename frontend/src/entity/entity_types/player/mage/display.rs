use std::time::Duration;

use bevy::{ecs::query::QueryData, prelude::*};

use crate::entity::entity_types::{
    display::{HeldItemAnimations, InitialHeldItemRenderState, LeftHand, RightHand},
    mage::{
        Mage, MageAction, MageHeldItem,
        animations::{default_positions},
    },
};

pub fn animate_mages(
    q_added_mages: Query<(Entity, &Children), Added<Mage>>,
    mut commands: Commands,
    mut q_mage_left_hand: Query<
        Entity,
        (
            With<LeftHand>,
            With<Mage>,
            Without<MageHeldItem>,
            Without<RightHand>,
        ),
    >,
    mut q_mage_right_hand: Query<
        Entity,
        (
            With<RightHand>,
            With<Mage>,
            Without<MageHeldItem>,
            Without<LeftHand>,
        ),
    >,
    mut q_mage_held_item: Query<
        Entity,
        (
            With<MageHeldItem>,
            With<Mage>,
            Without<LeftHand>,
            Without<RightHand>,
        ),
    >,
) {
    for (mage_entity, mage_children) in q_added_mages.iter() {
        let mut left_hand_entity = None;
        let mut right_hand_entity = None;
        let mut held_item_entity = None;
        for &child in mage_children {
            if q_mage_left_hand.get(child).is_ok() {
                left_hand_entity = Some(child);
            } else if q_mage_right_hand.get(child).is_ok() {
                right_hand_entity = Some(child);
            } else if q_mage_held_item.get(child).is_ok() {
                held_item_entity = Some(child);
            }
        }
        let (Some(left_hand_entity), Some(right_hand_entity), Some(held_item_entity)) =
            (left_hand_entity, right_hand_entity, held_item_entity)
        else {
            panic!("missing mage components");
        };
        let default_positions = default_positions();

        commands.entity(mage_entity).observe(
            |trigger: Trigger<MageAction>,
             mut q_mage_children: Query<&mut Children, With<Mage>>,
             mut q_mage_left_hand: Query<
                Entity,
                (
                    With<LeftHand>,
                    With<Mage>,
                    Without<MageHeldItem>,
                    Without<RightHand>,
                ),
            >,
             mut q_mage_right_hand: Query<
                Entity,
                (
                    With<RightHand>,
                    With<Mage>,
                    Without<MageHeldItem>,
                    Without<LeftHand>,
                ),
            >,
             mut q_mage_held_item: Query<
                Entity,
                (
                    With<MageHeldItem>,
                    With<Mage>,
                    Without<LeftHand>,
                    Without<RightHand>,
                ),
            >,
             mut commands: Commands| {
                if let Ok(mage_children) = q_mage_children.get_mut(trigger.target()) {
                    let mut left_hand_entity = None;
                    let mut right_hand_entity = None;
                    let mut held_item_entity = None;
                    for &child in &mage_children {
                        if q_mage_left_hand.get(child).is_ok() {
                            left_hand_entity = Some(child);
                        } else if q_mage_right_hand.get(child).is_ok() {
                            right_hand_entity = Some(child);
                        } else if q_mage_held_item.get(child).is_ok() {
                            held_item_entity = Some(child);
                        }
                    }
                    let (Some(left_hand_entity), Some(right_hand_entity), Some(held_item_entity)) =
                        (left_hand_entity, right_hand_entity, held_item_entity)
                    else {
                        error!("missing mage components");
                        return;
                    };
                    let mut left_hand = q_mage_left_hand.get_mut(left_hand_entity).unwrap();
                    let mut right_hand = q_mage_right_hand.get_mut(right_hand_entity).unwrap();
                    let mut held_item = q_mage_held_item.get_mut(held_item_entity).unwrap();
                }
            },
        );
    }
}
