package main

import (
	"net/http"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/api"
)

func main() {
	mux := api.NewRouter()
	http.ListenAndServe(":3000", mux)
}
