package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"be/internal/ws/controller"
	"be/internal/ws/gateway"
)

func InitWebSocketRoutes(app *fiber.App, hub *gateway.Hub) {
	ctrl := controller.NewWSController(hub)

	app.Get("/ws", ctrl.HandleWS)
	app.Get("/ws", websocket.New(ctrl.WebSocketHandler))
}
