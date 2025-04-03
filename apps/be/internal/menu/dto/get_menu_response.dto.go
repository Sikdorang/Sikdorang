package dto

type GetMenuResponseDTO struct {
	ID         uint   `json:"id"`
	Menu       string `json:"menu"`
	Price      int    `json:"price"`
	SoldOut    bool   `json:"soldOut"`
	Order      int    `json:"order"`
	StoreID    uint   `json:"storeId"`
	CategoryID *uint  `json:"categoryId,omitempty"`
	Category   string `json:"category"`
}
