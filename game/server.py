from socketify import WebSocket, OpCode
from time import sleep

class Game:
    def __init__(self):
        pass


game = Game()


def ws_open(ws: WebSocket):
    print("A WebSocket got connected!")
    ws.send("Hello World!", OpCode.TEXT)


def ws_message(ws: WebSocket, message, opcode):
    print(message, opcode)
    # Ok is false if backpressure was built up, wait for drain
    ok = ws.send(message, opcode)


def ws_close(ws: WebSocket, code, message):
    print("websocket closed")
