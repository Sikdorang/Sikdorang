package s3

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/middleware"
	"be/internal/s3/controller"
	"be/internal/s3/repository"
	"be/internal/s3/service"
)

func InitS3Routes(router fiber.Router, db *gorm.DB) {
	repo := repository.NewS3Repository(db)
	svc := service.NewS3Service(repo)
	ctrl := controller.NewS3Controller(svc)

	group := router.Group("/s3", middleware.JWTProtected())

	// ✅ 여기에 API들 등록
	group.Post("/:menuID", ctrl.GeneratePresignedURL)
}
