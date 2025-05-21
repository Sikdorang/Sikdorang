package category

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/category/controller"
	"be/internal/category/repository"
	"be/internal/category/service"
	"be/internal/middleware"
	notification "be/internal/notification/service"
)

func InitCategoryRoutes(router fiber.Router, db *gorm.DB, notify *notification.NotificationService) {
	repo := repository.NewCategoryRepository(db)
	svc := service.NewCategoryService(repo, notify)
	ctrl := controller.NewCategoryController(svc)

	group := router.Group("/categories", middleware.JWTProtected())

	group.Patch("/order", ctrl.UpdateCategoryOrder)
	group.Get("/", ctrl.GetCategories)
	group.Post("/", ctrl.CreateCategory)
	group.Patch("/:categoryId", ctrl.UpdateCategory)
	group.Delete("/:categoryId", ctrl.DeleteCategory)
}