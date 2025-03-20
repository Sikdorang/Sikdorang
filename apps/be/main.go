package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// 기본 라우트 설정
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("🚀 Fiber server is running!")
	})

	// 서버 실행
	port := ":3000"
	log.Println("🚀 Server running on port", port)
	log.Fatal(app.Listen(port))
}
