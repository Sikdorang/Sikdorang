package controller

import (
	"github.com/gofiber/fiber/v2"

	errorDto "be/internal/common/dto"
	"be/internal/menu/dto"
	"be/internal/menu/service"
	"be/internal/middleware"
	"strconv"
)

type MenuController struct {
	service service.MenuService
}

func NewMenuController(svc service.MenuService) *MenuController {
	return &MenuController{service: svc}
}

// GetMenus godoc
// @Summary      메뉴 목록 조회
// @Description  storeID에 해당하는 메뉴 목록을 조회합니다.
// @Tags         menu
// @Produce      json
// @Success      200 {array} dto.GetMenuResponseDTO
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /menus [get]
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

// SyncMenus godoc
// @Summary      메뉴 동기화
// @Description  여러 메뉴에 대해 생성/수정/삭제 동기화를 처리합니다.
// @Tags         menu
// @Accept       json
// @Produce      json
// @Param        request body []dto.SyncMenuRequestDTO true "동기화 요청 데이터"
// @Success      200 {object} map[string]string "전체 성공"
// @Failure      207 {object} map[string]interface{} "일부 실패"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      400 {object} errorDto.ErrorResponse "요청 바디 오류"
// @Router       /menus/ [post]
func (c *MenuController) SyncMenus(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	var body []dto.SyncMenuRequestDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid body"})
	}

	errs, err := c.service.SyncMenus(storeID, body)
	if err != nil {
		return ctx.Status(207).JSON(fiber.Map{
			"message": "partial success",
			"errors":  errs,
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "sync completed successfully",
	})
}

// GetMenuBoard godoc
// @Summary      메뉴판 조회
// @Description  카테고리 ID로 메뉴, 이미지, 태그를 함께 조회합니다.
// @Tags         menu
// @Produce      json
// @Param        category_id path int true "카테고리 ID"
// @Success      200 {array} dto.GetMenuBoardResponseDTO
// @Failure      400 {object} errorDto.ErrorResponse
// @Failure      401 {object} errorDto.ErrorResponse
// @Failure      500 {object} errorDto.ErrorResponse
// @Router       /menus/board/{categoryID} [get]
func (c *MenuController) GetMenuBoard(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	categoryParam := ctx.Params("categoryID")
	if categoryParam == "" {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "categoryID is required"})
	}

	categoryID, err := strconv.Atoi(categoryParam)
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid category_id"})
	}

	menus, err := c.service.GetMenuBoard(storeID, uint(categoryID))
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to fetch menu board"})
	}

	return ctx.JSON(menus)
}

// GetDescription godoc
// @Summary      메뉴 상세 조회
// @Description  storeID와 menuID로 메뉴 상세 정보를 조회합니다. (Preview, Details, Tags, Images 포함)
// @Tags         menu
// @Produce      json
// @Param        menuId path int true "메뉴 ID"
// @Success      200 {object} dto.GetDescriptionResponseDTO
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청 (menuId 없음 또는 invalid)"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /menus/{menuID} [get]
func (c *MenuController) GetDescription(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}
	menuParam := ctx.Params("menuID")
	if menuParam == "" {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "menuId is required"})
	}

	menuID, err := strconv.Atoi(menuParam)
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid menu_id"})
	}

	description, err := c.service.GetDescription(storeID, uint(menuID))
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to fetch description"})
	}

	return ctx.JSON(description)
}

// UpdateDescription godoc
// @Summary      메뉴 상세 수정
// @Description  storeID와 menuID로 메뉴 상세정보(Preview, Details, Tags, Images)를 수정합니다.
// @Tags         menu
// @Accept       json
// @Produce      json
// @Param        menuID path int true "메뉴 ID"
// @Param        request body dto.UpdateDescriptionRequestDTO true "수정할 데이터"
// @Success      200 {object} map[string]string "수정 완료 메시지"
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청 (menuId 없음 또는 invalid)"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /menus/{menuID} [patch]
func (c *MenuController) UpdateDescription(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	menuParam := ctx.Params("menuID")
	if menuParam == "" {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "menuId is required"})
	}

	menuID, err := strconv.Atoi(menuParam)
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid menu_id"})
	}

	var body dto.UpdateDescriptionRequestDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid body"})
	}

	if err := c.service.UpdateDescription(storeID, uint(menuID), body); err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to update description"})
	}

	return ctx.JSON(fiber.Map{"message": "update completed successfully"})
}
