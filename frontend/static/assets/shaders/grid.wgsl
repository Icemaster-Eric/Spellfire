@group(2) @binding(0)
var<uniform> line_color: vec4<f32>;

@group(2) @binding(1)
var<uniform> line_width: f32;

@group(2) @binding(2)
var<uniform> tile_size: f32;

@group(2) @binding(3)
var<uniform> meter_px: f32;

struct VertexInput {
    @location(0) position: vec3<f32>,   // Mesh vertex positions
    @location(1) normal: vec3<f32>,     // Optional normals
    @location(2) uv: vec2<f32>,         // Optional UVs
};

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>, // Required
    @location(0) world_pos: vec3<f32>           // Pass to fragment if needed
};

@group(0) @binding(0)
var<uniform> view_proj: mat4x4<f32>;

@group(1) @binding(0)
var<storage, read> model: mat4x4<f32>; // Per-entity model matrix

fn modulo(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

@vertex
fn vertex(in: VertexInput) -> VertexOutput {
    var out: VertexOutput;

    let world_pos = (model * vec4<f32>(in.position, 1.0)).xyz;

    out.clip_position = view_proj * vec4<f32>(world_pos, 1.0);

    out.world_pos = world_pos;
    return out;
}

@fragment
fn fragment(in: VertexOutput) -> @location(0) vec4<f32> {
    let x_mod = modulo(in.world_pos.x, tile_size);
    let y_mod = modulo(in.world_pos.y, tile_size);

    var color = vec4<f32>(0.0, 0.0, 0.0, 0.0);

    if (x_mod <= line_width || y_mod <= line_width) {
        color = line_color;
    }

    return color;
}

