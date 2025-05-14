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
	if v, ok := data["status"].(string); ok {
		menu.Status = v
	}
	if v, ok := data["order"].(string); ok {
		menu.Order = v
	}
	if v, ok := data["categoryId"].(float64); ok {
		categoryID := uint(v)
		if categoryID == 0 {
			menu.CategoryID = nil
		} else {
			menu.CategoryID = &categoryID
		}
	}

	return menu
}
