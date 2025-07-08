# Architecture

All paths are assumed to be relative to `src`

## Structure

Initially, the app :

The game uses a pseudo-TEA-MVC + pub/sub like structure:

- `/state` contains the game state
- `/ui` and `/multiplayer` contains publishers that send events to `/game`
- `/entities` contains render info and drivers of every entity
- `/physics` contains drivers (physics solvers)
- `/game` and subscribes to events to delegate to drivers and contains the game and render loop

Publishers send events that are delegated to drivers which modify state that is to be rendered.

There are also services, which also subscribe to events, but they do not affect the game state significantly:
 - `/audio` plays audio
 - `/multiplayer` also sends packets back to the server