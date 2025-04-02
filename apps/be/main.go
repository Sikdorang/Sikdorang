package main
// @title My API
// @version 1.0
// @description API 문서
// @host Localhost:4000
// @BasePath /api
import (
	"log"
	"github.com/gofiber/fiber/v2"
	"be/config"
	"be/internal/models"
	"be/internal/routes"
)

func main() {
	// DB 초기화 (.env 기반)
	db := config.InitDB()

	// 모델 자동 마이그레이션
	db.AutoMigrate(
		&models.Store{},
		&models.Category{},
		&models.Menu{},
		&models.Image{},
		&models.RecommandKeyword{},
		&models.RecommandQuestion{},
		&models.RecommandMenu{},
		&models.Tag{},
	)	

	// Fiber 인스턴스 생성
	app := fiber.New()

	// 🎯 도메인별 라우터 한 줄로 등록
	routes.SetupRoutes(app, db)

	log.Println("🚀 Server running on port 4000")
	log.Fatal(app.Listen(":4000"))
}
