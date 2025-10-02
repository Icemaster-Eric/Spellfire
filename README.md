# Spellfire
A blazingly fast MMO game server.

## Features
The frontend was built with Rust + Bevy, running on the web with WASM. The backend server is written with Golang (I had to learn Golang from scratch to make this) and the highly performant `lxzan/gws` library.

Check out the [site](https://spellfire.hutao.rip) for a demo and more details!

## Build instructions
1. Clone this repo
2. Install `go`, `just`, `rust`, and `wasm-bindgen` in a sh-capable environment
3.`cd` into `/backend` and run `go run cmd/spellfire/main.go`
4. `cd` into `/frontend`, edit the connection URL to your own in `/frontend/src/main.rs`, and run `just build`. Use a static HTTP server to host `/frontend/dist`.
> [!WARNING] 
> Building the frontend may require ~35gb of extra space and some time, especially on low-end machines. Bevy isn't small!
