package controller

import (
	"github.com/gofiber/fiber/v2"
	"be/internal/category/service"
)

type CategoryController struct {
	service service.CategoryService
}

func NewCategoryController(svc service.CategoryService) *CategoryController {
	return &CategoryController{service: svc}
}

func (c *CategoryController) GetCategories(ctx *fiber.Ctx) error {
	categories, err := c.service.GetAll() // ✅ 변경된 이름 호출
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch categories",
		})
	}
	return ctx.JSON(categories)
}
