package dto

type UpdateCategoryResponseDTO struct {
	ID       uint   `json:"id" example:"1"`
	Category string `json:"category" example:"음료"`
	StoreID  uint   `json:"storeId" example:"2"`
}
