package dto

type GeneratePresignedURLRequestDTO struct {
	Filename string `json:"filename" binding:"required"`
}
