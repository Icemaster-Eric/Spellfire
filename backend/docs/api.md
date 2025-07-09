# API Specification
A complete list of the different websocket events and data that are sent between the client and the server. This specification will be written from the server side's perspective

### `POST` `/api/token`
- Grab access token from discord api
- Calls the discord api with the access token and saves user information to a "waiting" list for connecting
    ```py
    # saves this to a list (?)
    {"discord_id": 1037122721787344428, ...}
    ```
- Returns the access token

### `WebSocket` `/ws`
- `on_connect`
    - Wait for client to send authentication credentials
        ```py
        # normal auth flow
        {"discord_id": 1037122721787344428, ...}
        # guests don't need authentication, but data isn't permanent/saved in database
        {"guest": True, "username": str, ...} # no discord_id field
        ```
    - Verify authentication credentials
        - Check "waiting" list for discord_id
    - Spawn in the player
        - If the player is new, update database with new player info
        - If the player is returning, grab info from database
    - Send initial environment/state information
        ```py
        {
            ""
        }
        ```

- `on_message` `type:actions`
    - [to be determined]

- `on_close`
    - Save player state to database
    - Remove player from current game
