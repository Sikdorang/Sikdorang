package controller

import (
	"errors"
	"strconv"

	"github.com/gofiber/fiber/v2"

	"be/internal/category/service"
	"be/internal/category/dto"
	errorDto "be/internal/common/dto"
	"be/internal/middleware"
)

type CategoryController struct {
	service service.CategoryService
}

func NewCategoryController(svc service.CategoryService) *CategoryController {
	return &CategoryController{service: svc}
}

// CreateCategory godoc
// @Summary      카테고리 생성
// @Description  storeID에 해당하는 카테고리를 추가합니다.
// @Tags         category
// @Accept       json
// @Produce      json
// @Param        request body dto.CreateCategoryRequestDTO true "카테고리 요청 데이터"
// @Success      201 {object} dto.CreateCategoryResponseDTO "생성된 카테고리 응답"
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /categories [post]
func (c *CategoryController) CreateCategory(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	var body dto.CreateCategoryRequestDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid body"})
	}

	created, err := c.service.Create(body.Category, storeID)
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "create failed"})
	}

	return ctx.Status(201).JSON(dto.CreateCategoryResponseDTO{
		ID:       created.ID,
		Category: created.Category,
		StoreID:  created.StoreID,
	})
}

// GetCategories godoc
// @Summary      카테고리 목록 조회
// @Description  storeID에 해당하는 카테고리 이름 목록을 조회합니다.
// @Tags         category
// @Produce      json
// @Success      200 {object} dto.GetCategoryResponseDTO "카테고리 이름 배열"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "조회 실패"
// @Router       /categories [get]
func (c *CategoryController) GetCategories(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	categories, err := c.service.GetAllByStoreID(storeID)
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to fetch categories"})
	}

	var names []string
	for _, cat := range categories {
		names = append(names, cat.Category)
	}

	return ctx.JSON(dto.GetCategoryResponseDTO{
		Category: names,
	})
}

// UpdateCategory godoc
// @Summary      카테고리 수정
// @Description  카테고리 ID와 storeID로 카테고리 이름을 수정합니다.
// @Tags         category
// @Accept       json
// @Produce      json
// @Param        categoryId path int true "카테고리 ID"
// @Param        request body dto.UpdateCategoryRequestDTO true "수정할 카테고리 정보"
// @Success      200 {object} dto.UpdateCategoryResponseDTO
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      404 {object} errorDto.ErrorResponse "카테고리 없음"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /categories/{categoryId} [patch]
func (c *CategoryController) UpdateCategory(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	categoryID, err := strconv.Atoi(ctx.Params("categoryId"))
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid id"})
	}

	var body dto.UpdateCategoryRequestDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid body"})
	}

	updated, err := c.service.Update(uint(categoryID), storeID, body.Category)
	if err != nil {
		if errors.Is(err, service.ErrCategoryNotFound) {
			return ctx.Status(404).JSON(errorDto.ErrorResponse{Error: "category not found"})
		}
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "update failed"})
	}

	return ctx.JSON(dto.UpdateCategoryResponseDTO{
		ID:       updated.ID,
		Category: updated.Category,
		StoreID:  updated.StoreID,
	})
}

// DeleteCategory godoc
// @Summary      카테고리 삭제
// @Description  카테고리 ID와 storeID로 카테고리를 삭제합니다.
// @Tags         category
// @Produce      json
// @Param        categoryId path int true "카테고리 ID"
// @Success      200 {object} dto.DeleteCategoryResponseDTO "삭제 성공 메시지"
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      404 {object} errorDto.ErrorResponse "카테고리 없음"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /categories/{categoryId} [delete]
func (c *CategoryController) DeleteCategory(ctx *fiber.Ctx) error {
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	categoryID, err := strconv.Atoi(ctx.Params("categoryId"))
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid id"})
	}

	err = c.service.Delete(uint(categoryID), storeID)
	if err != nil {
		if errors.Is(err, service.ErrCategoryNotFound) {
			return ctx.Status(404).JSON(errorDto.ErrorResponse{Error: "category not found"})
		}
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "delete failed"})
	}

	return ctx.Status(200).JSON(dto.DeleteCategoryResponseDTO{Message: "category deleted successfully"})
}
