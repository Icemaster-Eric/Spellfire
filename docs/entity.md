# Entities
A complete list of every entity in the game and possible values.

- `Player`
    ```py
    # object info
    {
        "id": int, # id (unique for every object that has ever existed)
        "idx": int # index in physics data numpy array
    }
    # physics data
    [
        float32, # x position
        float32, # y position
        float32, # radius
    ]
    ```
- `Bullet`
    ```py
    # object info
    {
        "id": int, # id (unique for every object that has ever existed)
        "idx": int # index in physics data numpy array
    }
    # physics data
    [
        float32, # x position
        float32, # y position
        float32, # vx
        float32, # vy
        float32, # radius
    ]
    ```

## Entity Component System
Just some general ideas for implementing something ECS-adjacent that utilizes numpy arrays for speedups

```py
# Bullets
[
    [x: int, y: int, vx: int, vy: int, max_dist: int]
    ...
]
```
