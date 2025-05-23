package gateway

import (
	"sync"
	"github.com/gofiber/websocket/v2"
	"encoding/json"
	"log"
	"strconv"
)

type WSClient struct {
	Conn    *websocket.Conn
	StoreID string
}

type Hub struct {
	mu      sync.RWMutex
	clients map[string][]*WSClient
}

func NewHub() *Hub {
	return &Hub{clients: make(map[string][]*WSClient)}
}

func (h *Hub) Register(storeID string, client *WSClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.clients[storeID] = append(h.clients[storeID], client)
}

func (h *Hub) Unregister(storeID string, target *WSClient) {
	h.mu.Lock()
	defer h.mu.Unlock()

	newList := []*WSClient{}
	for _, c := range h.clients[storeID] {
		if c != target {
			newList = append(newList, c)
		}
	}
	h.clients[storeID] = newList
}

func (h *Hub) SendToStore(storeID string, message string) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	for _, client := range h.clients[storeID] {
		client.Conn.WriteMessage(websocket.TextMessage, []byte(message))
	}
}

func (h *Hub) SendMessage(storeID uint, payload map[string]interface{}) {
	message, err := json.Marshal(payload)
	if err != nil {
		log.Printf("메시지 직렬화 실패: %v", err)
		return
	}

	h.SendToStore(strconv.Itoa(int(storeID)), string(message))
}
