package server

import (
	"encoding/json"
	"fmt"
	"time"
)

type ClientEnterGamePacket struct {
	Type string `json:"type"`
}

type ClientMovePacket struct {
	Type     string     `json:"type"`
	Movement [2]float64 `json:"movement"`
}

type ClientMessage struct {
	Timestamp UnixTime        `json:"timestamp"`
	Packets   []PacketWrapper `json:"packets"`
}

type ServerMessage struct {
	Timestamp UnixTime `json:"timestamp"`
	Entities  []any    `json:"entities"`
	Events    []any    `json:"events"`
}

type Packet any

type PacketWrapper struct {
	Packet
}

func (pw *PacketWrapper) UnmarshalJSON(data []byte) error {
	var temp struct {
		Type string `json:"type"`
	}
	if err := json.Unmarshal(data, &temp); err != nil {
		return err
	}

	switch temp.Type {
	case "enter_game":
		var p ClientEnterGamePacket
		if err := json.Unmarshal(data, &p); err != nil {
			return err
		}
		pw.Packet = p
	case "move":
		var p ClientMovePacket
		if err := json.Unmarshal(data, &p); err != nil {
			return err
		}
		pw.Packet = p
	default:
		return fmt.Errorf("unknown type: %s", temp.Type)
	}
	return nil
}

type UnixTime time.Time

func (t *UnixTime) UnmarshalJSON(b []byte) error {
	var seconds int64
	if err := json.Unmarshal(b, &seconds); err != nil {
		return err
	}
	*t = UnixTime(time.Unix(seconds, 0).UTC())
	return nil
}

func (t UnixTime) MarshalJSON() ([]byte, error) {
	return json.Marshal(time.Time(t).Unix())
}

func (t UnixTime) String() string {
	return time.Time(t).Format(time.RFC3339)
}
