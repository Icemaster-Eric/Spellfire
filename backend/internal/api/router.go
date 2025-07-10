package api

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/server"
	"log"
	"net/http"
)

func NewRouter() *http.ServeMux {
	world := game.NewWorld()
	srv := server.NewServer(world)
	upgrader := server.NewUpgrader(srv)

	srv.Run()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	mux.HandleFunc("POST /api/token", oauth)
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		socket, err := upgrader.Upgrade(w, r)
		if err != nil {
			log.Printf("Accept: %s", err.Error())
			return
		}
		socket.ReadLoop()
	})
	return mux
}
