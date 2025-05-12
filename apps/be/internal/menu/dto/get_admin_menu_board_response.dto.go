package dto

type AdminMenuBoardDTO struct {
	CategoryID   uint                `json:"id"`
	CategoryName string              `json:"category"`
	Order        string              `json:"order"`
	Menus        []AdminMenuItemDTO `json:"menus"`
}

type AdminMenuItemDTO struct {
	MenuID  uint     `json:"id"`
	Name    string   `json:"menu"`
	Price   int      `json:"price"`
	Order   string   `json:"order"`
	Tags    []string `json:"tags"`
	Images  string `json:"images"`
}
