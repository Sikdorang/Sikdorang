package routes

import (
	"github.com/gofiber/fiber/v2"
	"be/internal/category/controller"
)

func RegisterCategoryRoutes(router fiber.Router, ctrl *controller.CategoryController) {
	group := router.Group("/categories")

	group.Get("/", ctrl.GetCategories) // ✅ 메서드 호출
}
