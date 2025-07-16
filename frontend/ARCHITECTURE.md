# Architecture

All paths are assumed to be relative to `src`

## Structure

The gist is:
 - pub/sub to publish events from external systems
 - systems subscribe to events
 - systems mutate state from dependency injection
 - state gets rendered
 - services also subscribe to events to use external systems