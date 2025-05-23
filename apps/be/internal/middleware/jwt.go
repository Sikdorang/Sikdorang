package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"errors"
	"strconv"
)

func JWTProtected() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
		ContextKey: "user", // 기본값은 "user"
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "unauthorized",
			})
		},
	})
}

// 미들웨어 이후 사용할 storeId 꺼내기
func ExtractStoreID(c *fiber.Ctx) (uint, error) {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	storeID := uint(claims["storeId"].(float64))
	return storeID, nil
}

func ExtractStoreIDFromToken(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return "", errors.New("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid claims")
	}

	if val, ok := claims["storeId"].(string); ok {
		return val, nil
	}
	if val, ok := claims["storeId"].(float64); ok {
		return strconv.Itoa(int(val)), nil
	}
	return "", errors.New("storeId missing in token")
}