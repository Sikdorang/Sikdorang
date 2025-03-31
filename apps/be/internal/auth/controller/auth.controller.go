package controller

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"

	"be/internal/auth/service"
)

type AuthController struct {
	service service.AuthService
}

func NewAuthController(svc service.AuthService) *AuthController {
	return &AuthController{service: svc}
}

func (ac *AuthController) Login(ctx *fiber.Ctx) error {
	var body struct {
		UserId   string `json:"userId"`
		Password string `json:"password"`
	}

	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}

	store, err := ac.service.Login(body.UserId, body.Password)
	if err != nil {
		return ctx.Status(401).JSON(fiber.Map{"error": "invalid credentials"})
	}

	// Access Token (15분)
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"storeId": store.ID,
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	})
	accessTokenStr, _ := accessToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	// Refresh Token (1년)
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"storeId": store.ID,
		"exp":     time.Now().Add(time.Hour * 24 * 365).Unix(),
	})
	refreshTokenStr, _ := refreshToken.SignedString([]byte(os.Getenv("JWT_REFRESH_SECRET")))

	// DB에 저장
	if err := ac.service.SaveRefreshToken(store.ID, refreshTokenStr); err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": "token save error"})
	}

	// Refresh Token은 HttpOnly 쿠키로 전달
	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshTokenStr,
		HTTPOnly: true,
		Secure:   false, // 로컬 테스트 시 false로 잠시 설정 가능
		Path:     "/",
		Expires:  time.Now().Add(365 * 24 * time.Hour),
	})

	// Access Token 응답
	return ctx.JSON(fiber.Map{
		"accessToken": accessTokenStr,
	})
}

func (ac *AuthController) RefreshToken(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("refresh_token")
	if cookie == "" {
		return ctx.Status(401).JSON(fiber.Map{"error": "refresh token missing"})
	}

	token, err := jwt.Parse(cookie, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_REFRESH_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return ctx.Status(401).JSON(fiber.Map{"error": "invalid refresh token"})
	}

	claims := token.Claims.(jwt.MapClaims)
	storeId := uint(claims["storeId"].(float64))

	store, err := ac.service.GetStoreById(storeId)
	if err != nil || store.RefreshToken != cookie {
		return ctx.Status(401).JSON(fiber.Map{"error": "refresh token mismatch"})
	}

	newAccessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"storeId": storeId,
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	})
	signedToken, _ := newAccessToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	return ctx.JSON(fiber.Map{"accessToken": signedToken})
}

func (ac *AuthController) Logout(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("refresh_token")
	if cookie == "" {
		return ctx.SendStatus(204) // 이미 삭제된 상태
	}

	token, err := jwt.Parse(cookie, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_REFRESH_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return ctx.SendStatus(204)
	}

	claims := token.Claims.(jwt.MapClaims)
	storeId := uint(claims["storeId"].(float64))

	// DB에서 refresh token 제거
	if err := ac.service.SaveRefreshToken(storeId, ""); err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": "Failed to remove refresh token"})
	}

	// 쿠키 만료
	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    "",
		HTTPOnly: true,
		Expires:  time.Now().Add(-1 * time.Hour),
		Path:     "/",
		Secure:   false, // 로컬 테스트용
	})

	return ctx.SendStatus(200)
}
