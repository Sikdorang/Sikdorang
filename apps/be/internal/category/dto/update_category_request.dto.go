package dto

type CreateCategoryRequestDTO struct {
	Category string `json:"category" validate:"required" example:"증류주"`
}
