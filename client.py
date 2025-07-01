import asyncio
from websockets.asyncio.client import connect


async def hello():
    async with connect("ws://localhost:3000") as websocket:
        message = await websocket.recv()
        print(message)


if __name__ == "__main__":
    asyncio.run(hello())
