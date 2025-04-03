package repository

import (
	"gorm.io/gorm"
	"be/internal/models"
)

type MenuRepository interface {
	FindByStoreID(storeID uint) ([]models.Menu, error)
}

type menuRepository struct {
	db *gorm.DB
}

func NewMenuRepository(db *gorm.DB) MenuRepository {
	return &menuRepository{db: db}
}

func (r *menuRepository) FindByStoreID(storeID uint) ([]models.Menu, error) {
	var menus []models.Menu

	err := r.db.
		Preload("Category").
		Select("id", "menu", "price", "sold_out", "`order`", "store_id", "category_id").
		Where("store_id = ?", storeID).
		Find(&menus).Error

	return menus, err
}
