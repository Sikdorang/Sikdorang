package controller

import (
	"log"
	"strings"
	"be/internal/ws/gateway"
	"be/internal/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

type WSController struct {
	hub *gateway.Hub
}

func NewWSController(hub *gateway.Hub) *WSController {
	return &WSController{hub: hub}
}

// HandleWS godoc
// @Summary      WebSocket 연결 사전 인증
// @Description  JWT 토큰을 검증한 후 WebSocket 업그레이드를 허용합니다.
// @Tags         websocket
// @Accept       */*
// @Produce      plain
// @Success      101 {string} string "Switching Protocols"
// @Failure      401 {string} string "unauthorized"
// @Failure      426 {string} string "Upgrade Required"
// @Router       /ws [get]
func (c *WSController) HandleWS(ctx *fiber.Ctx) error {
	if !websocket.IsWebSocketUpgrade(ctx) {
		return fiber.ErrUpgradeRequired
	}

	token := ctx.Get("Sec-WebSocket-Protocol")
	if token == "" {
		token = ctx.Get("Authorization")
	}
	if !strings.HasPrefix(token, "Bearer ") {
		return ctx.Status(401).SendString("unauthorized")
	}
	token = strings.TrimPrefix(token, "Bearer ")

	storeID, err := middleware.ExtractStoreIDFromToken(token)
	if err != nil {
		log.Println("[WebSocket] 인증 실패:", err)
		return ctx.Status(401).SendString("unauthorized")
	}

	ctx.Locals("allowed", true)
	ctx.Locals("storeID", storeID)
	return ctx.Next()
}

func (c *WSController) WebSocketHandler(conn *websocket.Conn) {
	storeID := conn.Locals("storeID")
	if storeID == nil {
		conn.WriteMessage(websocket.TextMessage, []byte("unauthorized"))
		conn.Close()
		return
	}

	client := &gateway.WSClient{
		Conn:    conn,
		StoreID: storeID.(string),
	}

	c.hub.Register(client.StoreID, client)
	defer c.hub.Unregister(client.StoreID, client)

	log.Printf("WebSocket 연결됨 - storeID: %s", client.StoreID)

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Println("🔌 연결 종료:", err)
			return
		}
	}
}
