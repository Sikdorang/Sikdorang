package dto

type GetMenuBoardResponseDTO struct {
	ID         uint     `json:"id"`
	Menu       string   `json:"menu"`
	Price      int      `json:"price"`
	Status     string   `json:"status"`
	Order      string   `json:"order"`
	StoreID    uint     `json:"store_id"`
	CategoryID uint     `json:"category_id"`
	Category   string   `json:"category"`
	ImageURLs  []string `json:"image_urls"`
	Tags       []string `json:"tags"`
	Preview    string   `json:"preview"`
	Details    string   `json:"details"`
}
