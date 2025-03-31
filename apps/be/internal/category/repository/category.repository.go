package repository

import (
	"be/internal/models"
	"gorm.io/gorm"
)

type CategoryRepository interface {
	Save(category models.Category) error
	FindByStoreID(storeID uint) ([]models.Category, error)
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) Save(category models.Category) error {
	return r.db.Create(&category).Error
}

func (r *categoryRepository) FindByStoreID(storeID uint) ([]models.Category, error) {
	var categories []models.Category
	if err := r.db.Preload("Menus").Where("store_id = ?", storeID).Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}
