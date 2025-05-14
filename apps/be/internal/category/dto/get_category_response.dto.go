package dto

type GetCategoryResponseDTO struct {
	ID       uint   `json:"id" example:"1"`
	Category string `json:"category" example:"음료"`
	Order	 string `json:"order" example:"1"`
}
