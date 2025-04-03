package utils

import (
	"be/internal/models"
)

// MapToMenu converts map[string]any to *models.Menu
func MapToMenu(storeID uint, data map[string]any) *models.Menu {
	menu := &models.Menu{
		StoreID: storeID,
	}

	if v, ok := data["menu"].(string); ok {
		menu.Menu = v
	}
	if v, ok := data["price"].(float64); ok {
		menu.Price = int(v)
	}
	if v, ok := data["soldOut"].(bool); ok {
		menu.SoldOut = v
	}
	if v, ok := data["order"].(float64); ok {
		menu.Order = int(v)
	}
	if v, ok := data["categoryId"].(float64); ok {
		categoryID := uint(v)
		menu.CategoryID = &categoryID
	}

	return menu
}
