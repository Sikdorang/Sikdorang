package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	_ "be/docs"
	auth "be/internal/auth/route"
	category "be/internal/category/route"
	menu "be/internal/menu/route"
	s3 "be/internal/s3/route"
	notification "be/internal/notification/route" // ✅ 누락된 import

	swagger "github.com/gofiber/swagger"

	"be/internal/notification/gateway"
	notificationService "be/internal/notification/service"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {
	api := app.Group("/api")

	app.Get("/swagger/*", swagger.HandlerDefault)

	hub := gateway.NewHub()
	notifySvc := notificationService.NewNotificationService(hub)

	category.InitCategoryRoutes(api, db, notifySvc)
	auth.InitAuthRoutes(api, db)
	menu.InitMenuRoutes(api, db, notifySvc)
	s3.InitS3Routes(api, db)
	notification.InitNotificationRoutes(api, hub)
}
