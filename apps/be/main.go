package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"be/config"
	"be/internal/models"
)

func main() {
	// DB 초기화 (.env 기반)
	config.InitDB()

	// 모델 자동 마이그레이션
	config.DB.AutoMigrate(
		&models.Store{},
		&models.Category{},
		&models.Menu{},
		&models.Image{},
	)	
	// Fiber 인스턴스 생성
	app := fiber.New()

	// 서버 실행
	port := ":4000"
	log.Println("🚀 Server running on port", port)
	log.Fatal(app.Listen(port))
}
