package controller

import (
	"github.com/gofiber/fiber/v2"

	"be/internal/menu/service"
	errorDto "be/internal/common/dto"
	"be/internal/middleware"
)

type MenuController struct {
	service service.MenuService
}

func NewMenuController(svc service.MenuService) *MenuController {
	return &MenuController{service: svc}
}

func (c *MenuController) GetMenus(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	menus, err := c.service.GetAllByStoreID(storeID)
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to fetch menus"})
	}

	return ctx.JSON(menus)
}
