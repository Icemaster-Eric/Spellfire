package server

import (
	"log"
	"math/rand"
	"net/http"
	"fmt"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/lxzan/gws"
	"google.golang.org/protobuf/proto"
)

func generateRandomUsername() string {
	adjectives := []string{"Stinky", "Nerdy", "Sneaky", "PigHeaded", "Jealous", "Lazy", "Grumpy", "Silly"}
	nouns := []string{"Nerd", "Apple", "Banana", "Sock", "Programmer", "Weirdo", "Player"}
	names := []string{"Joe", "Bob", "Jack", "Josh", "James", "David", "John", "Robert", "Michael"}

	username := adjectives[rand.Intn(len(adjectives))] +
		nouns[rand.Intn(len(nouns))] +
		names[rand.Intn(len(names))]

	number := rand.Intn(10000)
	return fmt.Sprintf("%s%04d", username, number)
}

const (
	PingInterval         = 5 * time.Second
	HeartbeatWaitTimeout = 10 * time.Second
)

type Server struct {
	sessions *gws.ConcurrentMap[string, *gws.Conn]
	World    *game.World
	msgs int
}

func NewServer(w *game.World) *Server {
	return &Server{
		sessions: gws.NewConcurrentMap[string, *gws.Conn](16, 128),
		World:    w,
	}
}

func (s *Server) Run() {
	ticker := time.NewTicker(time.Second / game.TickRate)
	defer ticker.Stop()

	last := time.Now()
	for range ticker.C {
		now := time.Now()
		dt := now.Sub(last).Seconds()
		last = now
		s.World.Tick(dt)

		for name, p := range s.World.Players {
			conn, ok := s.sessions.Load(name)
			if !ok {
				continue
			}
			msg, err := proto.Marshal(p.ReadUpdate())
			if err != nil {
				continue
			}
			conn.WriteMessage(gws.OpcodeBinary, msg)
		}

		// reset packets after sending information to all players
		for _, p := range s.World.Players {
			p.WriteUpdate(func(pkt *pb.ServerPacket) {
				pkt.Reset()
			})
		}
	}
}

func (s *Server) OnOpen(socket *gws.Conn) {
	name := MustLoad[string](socket.Session(), "name")
	if conn, ok := s.sessions.Load(name); ok {
		conn.WriteClose(1000, []byte("connection is replaced"))
	}
	_ = socket.SetDeadline(time.Now().Add(PingInterval + HeartbeatWaitTimeout))
	s.sessions.Store(name, socket)
	log.Printf("%s connected\n", name)

	s.World.SpawnPlayer(name)
}

func (s *Server) OnClose(socket *gws.Conn, err error) {
	name := MustLoad[string](socket.Session(), "name")
	sharding := s.sessions.GetSharding(name)
	sharding.Lock()
	defer sharding.Unlock()

	if conn, ok := sharding.Load(name); ok {
		key0 := MustLoad[string](socket.Session(), "websocketKey")
		if key1 := MustLoad[string](conn.Session(), "websocketKey"); key1 == key0 {
			sharding.Delete(name)
		}
	}

	log.Printf("onerror, name=%s, msg=%s\n", name, err.Error())

	s.World.DespawnPlayer(name)
}

func (s *Server) OnMessage(socket *gws.Conn, message *gws.Message) {
	defer message.Close()

	// Chrome WebSocket does not support the ping method, so ping is simulated within a text frame.
	if b := message.Bytes(); len(b) == 4 && string(b) == "ping" {
		s.OnPing(socket, nil)
		return
	}

	name := MustLoad[string](socket.Session(), "name")

	p, ok := s.World.Players[name]
	if !ok {
		if conn, ok := s.sessions.Load(name); ok {
			conn.WriteClose(1000, []byte("You are dead."))
			return
		}
	}

	if len(p.Inputs) == 4 {
		// drop packet if more than 4 client packets queued
		log.Println("Dropped Packet:", name)
		return
	}

	packet := &pb.ClientPacket{}
	if err := proto.Unmarshal(message.Bytes(), packet); err != nil {
		log.Fatalln("Failed to parse:", err)
	}

	if s.msgs >= 120 {
		log.Println("name:", name, packet)
		s.msgs = 0
	} else {
		s.msgs++
	}

	p.Inputs<-packet
}

func NewUpgrader(handler gws.Event) *gws.Upgrader {
	return gws.NewUpgrader(handler, &gws.ServerOption{
		PermessageDeflate: gws.PermessageDeflate{
			Enabled:               false,
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

func (s *Server) OnPing(socket *gws.Conn, payload []byte) {
	_ = socket.SetDeadline(time.Now().Add(PingInterval + HeartbeatWaitTimeout))
	_ = socket.WriteString("pong")
}

func (s *Server) OnPong(socket *gws.Conn, payload []byte) {}

func MustLoad[T any](session gws.SessionStorage, key string) (v T) {
	if value, exist := session.Load(key); exist {
		v, _ = value.(T)
	}
	return
}
