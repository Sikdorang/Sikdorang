package dto

type CreateCategoryDTO struct {
	Category string `json:"category" validate:"required"`
}
