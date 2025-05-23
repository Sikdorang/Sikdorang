package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	_ "be/docs"
	auth "be/internal/auth/route"
	category "be/internal/category/route"
	menu "be/internal/menu/route"
	s3 "be/internal/s3/route"
	ws "be/internal/ws/route"

	swagger "github.com/gofiber/swagger"

	"be/internal/ws/gateway"
)

func SetupRoutes(app *fiber.App, db *gorm.DB, hub *gateway.Hub) {
	api := app.Group("/api")

	app.Get("/swagger/*", swagger.HandlerDefault) // /swagger/index.html

	// 도메인별 Init 함수에서 DI + 라우팅까지 전부 처리
	category.InitCategoryRoutes(api, db, hub)
	auth.InitAuthRoutes(api, db)
	menu.InitMenuRoutes(api, db, hub)
	s3.InitS3Routes(api, db)
	ws.InitWebSocketRoutes(app, hub)

}
