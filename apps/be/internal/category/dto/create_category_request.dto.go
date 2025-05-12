package dto

type CreateCategoryRequestDTO struct {
	Category string `json:"category" validate:"required" example:"증류주"`
	Order    string `json:"order" validate:"required" example:"111"`
}

