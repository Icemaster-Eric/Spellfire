from socketify import App, AppOptions, OpCode, CompressOptions
from game import (
    ws_open, ws_message, ws_close,
)


app = App()


def shutdown(res, req):
    res.end("Shutting down server...")
    app.close()


app.ws(
    "/*",
    {
        "compression": CompressOptions.DISABLED,
        "max_payload_length": 16 * 1024 * 1024,
        "idle_timeout": 12,
        "open": ws_open,
        "message": ws_message,
        "drain": lambda ws: print(
            "WebSocket backpressure: %s", ws.get_buffered_amount()
        ),
        "close": ws_close,
    },
)
app.any("/", lambda res, req: res.end("Nothing to see here!"))
app.get("/shutdown", shutdown)
app.listen(
    3000,
    lambda config: print("Listening on port http://localhost:%d" % (config.port)),
)

if __name__ == "__main__":
    app.run()
