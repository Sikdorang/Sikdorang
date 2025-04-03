package dto

type UpdateCategoryRequestDTO struct {
	Category string `json:"category" validate:"required" example:"증류주"`
}
