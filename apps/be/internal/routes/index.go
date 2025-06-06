package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	_ "be/docs"
	auth "be/internal/auth/route"
	category "be/internal/category/route"
	menu "be/internal/menu/route"
	s3 "be/internal/s3/route"

	swagger "github.com/gofiber/swagger"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {
	api := app.Group("/api")

	app.Get("/swagger/*", swagger.HandlerDefault) // /swagger/index.html

	// 도메인별 Init 함수에서 DI + 라우팅까지 전부 처리
	category.InitCategoryRoutes(api, db)
	auth.InitAuthRoutes(api, db)
	menu.InitMenuRoutes(api, db)
	s3.InitS3Routes(api, db)

}
