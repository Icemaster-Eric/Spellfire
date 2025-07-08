package main

import (
	"encoding/json"
	"fmt"

	"github.com/Icemaster-Eric/Spellfire-Backend/internal/server"
)

func main() {
	jsonData := []byte(`{
		"timestamp": 1720454400,
		"packets": [
			{"type": "enter_game"},
			{"type": "move", "movement": [2, 3]}
		]
	}`)

	var msg server.ClientMessage
	if err := json.Unmarshal(jsonData, &msg); err != nil {
		fmt.Println("Unmarshal error:", err)
		return
	}

	fmt.Println("Timestamp:", msg.Timestamp)
	for _, p := range msg.Packets {
		switch v := p.Packet.(type) {
		case server.PlayerEnterGamePacket:
			fmt.Println("Enter Game Packet")
		case server.PlayerMovePacket:
			fmt.Printf("Move Packet: %v\n", v.Movement)
		default:
			fmt.Println("Unknown packet type")
		}
	}
}
