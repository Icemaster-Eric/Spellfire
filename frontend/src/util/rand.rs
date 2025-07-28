use std::sync::atomic::{AtomicI32, Ordering};

static CURRENT_SEED: AtomicI32 = AtomicI32::new(i32::MIN);

pub fn rand_int() -> i32 {
    return hash(CURRENT_SEED.fetch_add(1, Ordering::Relaxed));
}

/// returns a float between 0. and 1.
pub fn rand_float() -> f32 {
    return (rand_int() % 13337317).unsigned_abs() as f32 / 13337317.;
}

// https://burtleburtle.net/bob/hash/integer.html
pub fn hash(a: i32) -> i32 {
    let mut a = a;
    a = (a ^ 61) ^ (a.wrapping_shr(16));
    a = a.wrapping_add(a.wrapping_shl(3));
    a = a ^ (a.wrapping_shr( 4));
    a = a.wrapping_mul(0x27d4eb2d);
    a = a ^ (a.wrapping_shr(15));
    return a;
}