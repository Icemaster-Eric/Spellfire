import os
from socketify import WebSocket, OpCode, Response, Request
from aiohttp import ClientSession


class Game:
    def __init__(self):
        pass


game = Game()


async def auth(res: Response, req: Request):
    body: dict = await res.get_json() # type: ignore
    async with ClientSession() as session:
        async with session.post(
            "https://discord.com/api/oauth2/token",
            params={
                "client_id": os.environ["DISCORD_CLIENT_ID"],
                "client_secret": os.environ["DISCORD_CLIENT_SECRET"],
                "grant_type": "authorization_code",
                "code": body["code"]
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        ) as response:
            access_token = await response.json()
    
    res.send({"access_token": access_token}, "text/json", end_connection=True)


def ws_open(ws: WebSocket):
    print("A WebSocket got connected!")
    ws.send("Hello World!", OpCode.TEXT)


def ws_message(ws: WebSocket, message, opcode):
    print(message, opcode)
    # Ok is false if backpressure was built up, wait for drain
    ok = ws.send(message, opcode)


def ws_close(ws: WebSocket, code, message):
    print("websocket closed")
