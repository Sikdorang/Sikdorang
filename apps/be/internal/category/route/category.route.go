package category

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/category/controller"
	"be/internal/category/service"
	"be/internal/category/repository"
	"be/internal/middleware"
)

func InitCategoryRoutes(router fiber.Router, db *gorm.DB) {
	repo := repository.NewCategoryRepository(db)
	svc := service.NewCategoryService(repo)
	ctrl := controller.NewCategoryController(svc)

	group := router.Group("/categories", middleware.JWTProtected())

	// ✅ 여기에 API들 등록
	group.Get("/", ctrl.GetCategories)        // GET /api/categories
	group.Post("/", ctrl.CreateCategory)      // POST /api/categories
	group.Patch("/:categoryId", ctrl.UpdateCategory)    // PUT /api/categories/:id
	group.Delete("/:categoryId", ctrl.DeleteCategory) // DELETE /api/categories/:id
}
