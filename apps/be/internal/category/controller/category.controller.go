package controller

import (
	"github.com/gofiber/fiber/v2"
	"be/internal/category/service"
	"be/internal/category/dto"
	"be/internal/middleware"
)

type CategoryController struct {
	service service.CategoryService
}

func NewCategoryController(svc service.CategoryService) *CategoryController {
	return &CategoryController{service: svc}
}

func (c *CategoryController) CreateCategory(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(fiber.Map{"error": "unauthorized"})
	}

	var body dto.CreateCategoryDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": "invalid body"})
	}

	category := struct {
	Category string
	StoreID  uint
}{
	Category: body.Category,
	StoreID:  storeID,
}

	created, err := c.service.Create(category)
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": "create failed"})
	}

	return ctx.Status(201).JSON(created)
}

func (c *CategoryController) GetCategories(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(fiber.Map{"error": "unauthorized"})
	}

	categories, err := c.service.GetAllByStoreID(storeID)
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": "failed to fetch categories"})
	}

	return ctx.JSON(categories)
}