package api

import (
	"github.com/lxzan/gws"
	"net/http"
	"time"
)

const (
	PingInterval = 5 * time.Second
	PingWait     = 10 * time.Second
)

var upgrader = gws.NewUpgrader(&Handler{}, &gws.ServerOption{
	ParallelEnabled:   true,                                 // Parallel message processing
	Recovery:          gws.Recovery,                         // Exception recovery
	PermessageDeflate: gws.PermessageDeflate{Enabled: true}, // Enable compression
})

type Handler struct{}

func (c *Handler) OnOpen(socket *gws.Conn) {
	_ = socket.SetDeadline(time.Now().Add(PingInterval + PingWait))
}

func (c *Handler) OnClose(socket *gws.Conn, err error) {}

func (c *Handler) OnPing(socket *gws.Conn, payload []byte) {
	_ = socket.SetDeadline(time.Now().Add(PingInterval + PingWait))
	_ = socket.WritePong(nil)
}

func (c *Handler) OnPong(socket *gws.Conn, payload []byte) {}

func (c *Handler) OnMessage(socket *gws.Conn, message *gws.Message) {
	defer message.Close()
	socket.WriteMessage(message.Opcode, message.Bytes())
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r)
	if err != nil {
		return
	}
	go func() {
		socket.ReadLoop() // Blocking prevents the context from being GC.
	}()
}
