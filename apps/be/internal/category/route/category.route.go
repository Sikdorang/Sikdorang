package category

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/category/controller"
	"be/internal/category/repository"
	"be/internal/category/service"
	"be/internal/middleware"
	"be/internal/ws/gateway"
)

func InitCategoryRoutes(router fiber.Router, db *gorm.DB, hub *gateway.Hub) {
	repo := repository.NewCategoryRepository(db)
	svc := service.NewCategoryService(repo, hub)
	ctrl := controller.NewCategoryController(svc)

	group := router.Group("/categories", middleware.JWTProtected())

	// 여기에 API들 등록
	group.Patch("/order", ctrl.UpdateCategoryOrder)
	group.Get("/", ctrl.GetCategories)
	group.Post("/", ctrl.CreateCategory)
	group.Patch("/:categoryId", ctrl.UpdateCategory)
	group.Delete("/:categoryId", ctrl.DeleteCategory)
}