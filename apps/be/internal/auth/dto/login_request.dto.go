package dto

type LoginRequestDTO struct {
	UserId   string `json:"userId" example:"admin123"`
	Password string `json:"password" example:"1234"`
}
