package notification

import (
	"github.com/gofiber/fiber/v2"

	"be/internal/middleware"
	"be/internal/notification/controller"
	"be/internal/notification/gateway"
)

func InitNotificationRoutes(router fiber.Router, hub *gateway.Hub) {
	ctrl := controller.NewSSEController(hub)

	router.Get("/sse/subscribe", middleware.JWTProtected(), ctrl.SSESubscribe)
}
