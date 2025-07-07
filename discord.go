package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)
import _ "github.com/joho/godotenv/autoload"

func oauth(w http.ResponseWriter, r *http.Request) {
	var data map[string]any
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "Invalid request JSON", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	code, ok := data["code"].(string)
	if !ok {
		http.Error(w, `"code" must be a string`, http.StatusBadRequest)
		return
	}

	body := fmt.Appendf(nil, `client_id=%s&client_secret=%s&grant_type=authorization_code&code=%s`, os.Getenv("DISCORD_CLIENT_ID"), os.Getenv("DISCORD_CLIENT_SECRET"), code)

	req, err := http.NewRequest("POST", "https://discord.com/api/oauth2/token", bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Error creating OAuth request", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{Timeout: time.Second}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Error sending OAuth request", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var newData map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&newData); err != nil {
		http.Error(w, "Invalid response JSON", http.StatusInternalServerError)
		return
	}

	accessToken, ok := newData["access_token"].(string)
	if !ok {
		http.Error(w, `"code" must be a string`, http.StatusBadRequest)
		return
	}

	w.Write([]byte(accessToken))
}
