package dto

type GetMenuResponseDTO struct {
	ID         uint   `json:"id"`
	Menu       string `json:"menu"`
	Price      int    `json:"price"`
	Status     string `json:"status"`
	Order      string `json:"order"`
	StoreID    uint   `json:"storeId"`
	CategoryID *uint  `json:"categoryId,omitempty"`
	Category   string `json:"category"`
}
