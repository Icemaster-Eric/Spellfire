# Spellfire
A blazingly fast MMO game server.

<img width="1226" height="719" alt="image" src="https://github.com/user-attachments/assets/6a0b383e-797b-44df-9101-f583f778c937" />

## Features
The frontend was built with Rust + Bevy, running on the web with WASM. The backend server is written with Golang (I had to learn Golang from scratch to make this) and the highly performant `lxzan/gws` library.

Check out the [site](https://spellfire.hutao.rip) for a demo and more details!

## Build instructions
1. Clone this repo
2. Install `go`, `just`, `rust`, and `wasm-bindgen` in a sh-capable environment
3.`cd` into `/backend` and run `go run cmd/spellfire/main.go`
4. `cd` into `/frontend` and run `just build`
