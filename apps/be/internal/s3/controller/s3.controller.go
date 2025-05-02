package controller

import (
	"strconv"
	"github.com/gofiber/fiber/v2"
	"be/internal/s3/service"
	"be/internal/middleware"
	"be/internal/s3/dto"
	errorDto "be/internal/common/dto"
)

type S3Controller struct {
	service service.S3Service
}

func NewS3Controller(svc service.S3Service) *S3Controller {
	return &S3Controller{service: svc}
}

// GeneratePresignedURL godoc
// @Summary      이미지 업로드용 Presigned URL 발급
// @Description  storeID (토큰에서 추출)와 menuID, filename을 기반으로 S3 Presigned URL을 발급합니다.
// @Tags         s3
// @Accept       json
// @Produce      json
// @Param        menuID path int true "메뉴 ID"
// @Param        request body dto.GeneratePresignedURLRequestDTO true "파일명"
// @Success      200 {object} map[string]string "Presigned URL 반환"
// @Failure      400 {object} errorDto.ErrorResponse "잘못된 요청"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /s3/{menuID} [post]
func (c *S3Controller) GeneratePresignedURL(ctx *fiber.Ctx) error {
	// Store ID 추출
	storeID, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	// URL 파라미터에서 menuID 가져오기
	menuParam := ctx.Params("menuID")
	if menuParam == "" {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "menuID is required"})
	}

	// menuID를 정수로 변환
	menuID, err := strconv.Atoi(menuParam)
	if err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid menu_id"})
	}

	// 요청 본문에서 Filename 파싱
	var body dto.GeneratePresignedURLRequestDTO
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid request body"})
	}

	// 서비스에 presigned URL 생성 요청
	url, err := c.service.GeneratePresignedURL(int(storeID), menuID, body.Filename)  // storeID를 int로 변환
	if err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "failed to generate URL"})
	}

	// 생성된 presigned URL을 응답으로 반환
	return ctx.Status(200).JSON(fiber.Map{
		"url": url,
	})
}
