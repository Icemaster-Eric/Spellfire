package server

import (
	"encoding/json"
	"github.com/Icemaster-Eric/Spellfire-Backend/internal/game"
	"github.com/lxzan/gws"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func generateRandomUsername() string {
	adjectives := []string{"Stinky", "Nerdy", "Sneaky", "PigHeaded", "Jealous", "Lazy", "Grumpy", "Silly"}
	nouns := []string{"Nerd", "Apple", "Banana", "Sock", "Programmer", "Weirdo", "Player"}
	names := []string{"Joe", "Bob", "Jack", "Josh", "James", "David", "John", "Robert", "Michael"}
	return adjectives[rand.Intn(len(adjectives))] + nouns[rand.Intn(len(nouns))] + names[rand.Intn(len(names))]
}

const (
	PingInterval         = 5 * time.Second
	HeartbeatWaitTimeout = 10 * time.Second
)

type Server struct {
	sessions *gws.ConcurrentMap[string, *gws.Conn]
	World    *game.World
}

func NewServer(w *game.World) *Server {
	return &Server{
		sessions: gws.NewConcurrentMap[string, *gws.Conn](16, 128),
		World:    w,
	}
}

func MustLoad[T any](session gws.SessionStorage, key string) (v T) {
	if value, exist := session.Load(key); exist {
		v, _ = value.(T)
	}
	return
}

func (c *Server) OnOpen(socket *gws.Conn) {
	name := MustLoad[string](socket.Session(), "name")
	if conn, ok := c.sessions.Load(name); ok {
		conn.WriteClose(1000, []byte("connection is replaced"))
	}
	_ = socket.SetDeadline(time.Now().Add(PingInterval + HeartbeatWaitTimeout))
	c.sessions.Store(name, socket)
	log.Printf("%s connected\n", name)
}

func (c *Server) OnClose(socket *gws.Conn, err error) {
	name := MustLoad[string](socket.Session(), "name")
	sharding := c.sessions.GetSharding(name)
	sharding.Lock()
	defer sharding.Unlock()

	if conn, ok := sharding.Load(name); ok {
		key0 := MustLoad[string](socket.Session(), "websocketKey")
		if key1 := MustLoad[string](conn.Session(), "websocketKey"); key1 == key0 {
			sharding.Delete(name)
		}
	}

	log.Printf("onerror, name=%s, msg=%s\n", name, err.Error())
}

func (c *Server) OnPing(socket *gws.Conn, payload []byte) {
	_ = socket.SetDeadline(time.Now().Add(PingInterval + HeartbeatWaitTimeout))
	_ = socket.WriteString("pong")
}

func (c *Server) OnPong(socket *gws.Conn, payload []byte) {}

type Input struct {
	To   string `json:"to"`
	Text string `json:"text"`
}

func (c *Server) OnMessage(socket *gws.Conn, message *gws.Message) {
	defer message.Close()

	// Chrome WebSocket does not support the ping method, so ping is simulated within a text frame.
	if b := message.Bytes(); len(b) == 4 && string(b) == "ping" {
		c.OnPing(socket, nil)
		return
	}

	var input = &Input{}
	_ = json.Unmarshal(message.Bytes(), input)
	if conn, ok := c.sessions.Load(input.To); ok {
		_ = conn.WriteMessage(gws.OpcodeText, message.Bytes())
	}
}

func NewUpgrader(handler gws.Event) *gws.Upgrader {
	return gws.NewUpgrader(handler, &gws.ServerOption{
		PermessageDeflate: gws.PermessageDeflate{
			Enabled:               true,
			ServerContextTakeover: true,
			ClientContextTakeover: true,
		},

		Authorize: func(r *http.Request, session gws.SessionStorage) bool {
			// don't require oauth yet during testing
			// var name = r.URL.Query().Get("id")
			// log.Printf("ID: %s", name)
			// if name == "" {
			// 	return false
			// }
			// session.Store("name", name)
			var guestMode = r.URL.Query().Get("guest")
			if guestMode != "true" {
				return false
			}
			session.Store("name", generateRandomUsername())
			session.Store("websocketKey", r.Header.Get("Sec-WebSocket-Key"))
			return true
		},
	})
}
