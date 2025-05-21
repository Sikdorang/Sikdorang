package controller

import (
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"

	errorDto "be/internal/common/dto"
	"be/internal/middleware"
	"be/internal/notification/gateway"
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

	// 1) 인증
	storeIDUint, err := middleware.ExtractStoreID(ctx)
	if err != nil {
		log.Println("[SSE] 인증 실패:", err)
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "unauthorized"})
	}
	storeID := strconv.Itoa(int(storeIDUint))
	log.Printf("[SSE] 인증 성공. storeID=%s\n", storeID)

	// 2) SSE 헤더 설정
	ctx.Set("Content-Type", "text/event-stream")
	ctx.Set("Cache-Control", "no-cache")
	ctx.Set("Connection", "keep-alive")

	// 3) 메시지 채널 및 클라이언트 등록
	msgChan := make(chan []byte, 10)
	client := &gateway.SSEClient{
		StoreID:  storeID,
		Messages: msgChan,
	}
	s.hub.Register(storeID, client)
	defer s.hub.Unregister(storeID, client)

	// 4) 연결 직후 확인 메시지
	_, _ = ctx.Write([]byte("event: heartbeat\ndata: {\"status\":\"connected\"}\n\n"))

	log.Printf("good")

	// 5) ping(heartbeat) 타이머 및 메시지 루프
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Context().Done():
			log.Println("[SSE] 연결 종료 감지")
			return nil

		case data := <-msgChan:
			// Hub.SendToStore 로부터 온 실제 이벤트 데이터
			if _, err := ctx.Write(data); err != nil {
				log.Println("[SSE] write error:", err)
				return err
			}

		case <-ticker.C:
			// 주기적 heartbeat 이벤트 전송
			_, err := ctx.Write([]byte("event: heartbeat\ndata: {}\n\n"))
			if err != nil {
				log.Println("[SSE] heartbeat write 실패:", err)
				return err
			}
		}
	}
}
