package controller

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"

	"be/internal/auth/dto"
	"be/internal/auth/service"
	errorDto "be/internal/common/dto"
)

type AuthController struct {
	service service.AuthService
}

func NewAuthController(svc service.AuthService) *AuthController {
	return &AuthController{service: svc}
}

// Login godoc
// @Summary      로그인
// @Description  아이디와 비밀번호로 로그인하여 Access/Refresh Token 발급
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body dto.LoginRequestDTO true "로그인 요청"
// @Success      200 {object} dto.LoginResponseDTO
// @Failure      400 {object} errorDto.ErrorResponse
// @Failure      401 {object} errorDto.ErrorResponse
// @Failure      500 {object} errorDto.ErrorResponse
// @Router       /auth/login [post]
func (ac *AuthController) Login(ctx *fiber.Ctx) error {
	var body dto.LoginRequestDTO

	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(400).JSON(errorDto.ErrorResponse{Error: "invalid input"})
	}

	store, err := ac.service.Login(body.UserId, body.Password)
	if err != nil {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "invalid credentials"})
	}

	// Access Token (15분)
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"storeId": store.ID,
		"exp":     time.Now().Add(time.Minute * 30).Unix(),
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
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "token save error"})
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
	return ctx.JSON(dto.LoginResponseDTO{
		AccessToken: accessTokenStr,
	})
}

// RefreshToken godoc
// @Summary      Access Token 갱신
// @Description  Refresh Token을 사용하여 새로운 Access Token을 발급합니다.
// @Tags         auth
// @Produce      json
// @Success      200 {object} dto.RefreshTokenResponseDTO "accessToken 응답"
// @Failure      401 {object} errorDto.ErrorResponse "Refresh Token 누락 또는 유효하지 않음"
// @Router       /auth/refresh [post]
func (ac *AuthController) RefreshToken(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("refresh_token")
	if cookie == "" {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "refresh token missing"})
	}

	token, err := jwt.Parse(cookie, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_REFRESH_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "invalid refresh token"})
	}

	claims := token.Claims.(jwt.MapClaims)
	storeId := uint(claims["storeId"].(float64))

	store, err := ac.service.GetStoreById(storeId)
	if err != nil || store.RefreshToken != cookie {
		return ctx.Status(401).JSON(errorDto.ErrorResponse{Error: "refresh token mismatch"})
	}

	newAccessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"storeId": storeId,
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	})
	signedToken, _ := newAccessToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	return ctx.JSON(dto.RefreshTokenResponseDTO{
		AccessToken: signedToken,
	})
}

// Logout godoc
// @Summary      로그아웃
// @Description  Refresh Token을 무효화하고 쿠키에서 제거합니다.
// @Tags         auth
// @Produce      json
// @Success      200 {object} dto.LogoutResponseDTO "로그아웃 성공"
// @Failure      500 {object} errorDto.ErrorResponse "서버 에러"
// @Router       /auth/logout [post]
func (ac *AuthController) Logout(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("refresh_token")
	if cookie == "" {
		return ctx.Status(200).JSON(dto.LogoutResponseDTO{Message: "already logged out"})
	}

	token, err := jwt.Parse(cookie, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_REFRESH_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return ctx.Status(200).JSON(dto.LogoutResponseDTO{Message: "already logged out"})
	}

	claims := token.Claims.(jwt.MapClaims)
	storeId := uint(claims["storeId"].(float64))

	if err := ac.service.SaveRefreshToken(storeId, ""); err != nil {
		return ctx.Status(500).JSON(errorDto.ErrorResponse{Error: "Failed to remove refresh token"})
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    "",
		HTTPOnly: true,
		Expires:  time.Now().Add(-1 * time.Hour),
		Path:     "/",
		Secure:   false,
	})

	return ctx.Status(200).JSON(dto.LogoutResponseDTO{Message: "logout success"})
}
