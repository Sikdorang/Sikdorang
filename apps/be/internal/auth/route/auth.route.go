package auth

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/auth/controller"
	"be/internal/auth/service"
)

func InitAuthRoutes(router fiber.Router, db *gorm.DB) {
	svc := service.NewAuthService(db)
	ctrl := controller.NewAuthController(svc)

	group := router.Group("/auth")
	group.Post("/login", ctrl.Login)
	group.Post("/refresh", ctrl.RefreshToken)
	group.Post("/logout", ctrl.Logout)
}
