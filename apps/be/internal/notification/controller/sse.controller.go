package controller

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"

	"be/internal/notification/gateway"
	errorDto "be/internal/common/dto"
	"be/internal/middleware"
	"log"
)

type SSEController struct {
	hub *gateway.Hub
}

func NewSSEController(hub *gateway.Hub) *SSEController {
	return &SSEController{hub: hub}
}

// SSESubscribe godoc
// @Summary      SSE 연결 구독
// @Description  로그인한 사용자의 storeID를 기반으로 SSE 연결을 생성합니다.
// @Tags         notification
// @Produce      text/event-stream
// @Success      200 {string} string "SSE 연결 성공"
// @Failure      401 {object} errorDto.ErrorResponse "인증 실패"
// @Failure      500 {object} errorDto.ErrorResponse "SSE 연결 실패"
// @Router       /sse/subscribe [get]
func (s *SSEController) SSESubscribe(ctx *fiber.Ctx) error {
	log.Println("[SSE] 요청 도착")

	storeIDUint, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		log.Println("[SSE] 인증 실패:", err)
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}

	storeID := strconv.Itoa(int(storeIDUint))
	log.Printf("[SSE] 인증 성공. storeID: %s\n", storeID)

	ctx.Set("Content-Type", "text/event-stream")
	ctx.Set("Cache-Control", "no-cache")
	ctx.Set("Connection", "keep-alive")

	client := &gateway.SSEClient{
		StoreID: storeID,
		Writer:  ctx, 
	}

	s.hub.Register(storeID, client)
	defer s.hub.Unregister(storeID, client)

	go func() {
		for {
			select {
			case <-ctx.Context().Done():
				log.Println("[SSE] 연결 종료 감지")
				return
			default:
				ctx.Write([]byte(": ping\n\n"))
				time.Sleep(30 * time.Second)
			}
		}
	}()

	<-ctx.Context().Done()
	return nil
}
