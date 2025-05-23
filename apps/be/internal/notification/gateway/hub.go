package gateway

import (
	"encoding/json"
	"fmt"
	"sync"
	"io"
)

type SSEClient struct {
	StoreID string
	Writer io.Writer 
}

type Hub struct {
	mu      sync.RWMutex
	clients map[string][]*SSEClient // storeID → 클라이언트 목록
}

func NewHub() *Hub {
	return &Hub{
		clients: make(map[string][]*SSEClient),
	}
}

func (h *Hub) Register(storeID string, client *SSEClient) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.clients[storeID] = append(h.clients[storeID], client)
}

func (h *Hub) Unregister(storeID string, target *SSEClient) {
	h.mu.Lock()
	defer h.mu.Unlock()

	clients := h.clients[storeID]
	newClients := make([]*SSEClient, 0, len(clients))
	for _, c := range clients {
		if c != target {
			newClients = append(newClients, c)
		}
	}
	h.clients[storeID] = newClients
}

func (h *Hub) SendToStore(storeID string, payload any) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	data, _ := json.Marshal(payload)
	for _, client := range h.clients[storeID] {
		fmt.Fprintf(client.Writer, "data: %s\n\n", data)
	}
}
