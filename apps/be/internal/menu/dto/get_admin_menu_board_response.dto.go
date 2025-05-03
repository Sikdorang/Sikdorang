package dto

type AdminMenuBoardDTO struct {
	CategoryID   uint                `json:"category_id"`
	CategoryName string              `json:"category_name"`
	Order        string              `json:"order"`
	Menus        []AdminMenuItemDTO `json:"menus"`
}

type AdminMenuItemDTO struct {
	MenuID  uint     `json:"menu_id"`
	Name    string   `json:"name"`
	Price   int      `json:"price"`
	Order   string   `json:"order"`
	Tags    []string `json:"tags"`
	Images  []string `json:"images"`
}
