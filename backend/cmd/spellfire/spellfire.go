package main

import (
	"github.com/Icemaster-Eric/Spellfire-Backend/internal/api"
	"net/http"
)

func main() {
	mux := api.NewRouter()
	http.ListenAndServe(":3000", mux)
}
