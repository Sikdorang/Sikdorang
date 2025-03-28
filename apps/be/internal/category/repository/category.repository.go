package repository

import (
	"gorm.io/gorm"
	"be/internal/models"
)
type CategoryRepository interface {
	FindAll() ([]models.Category, error)
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) FindAll() ([]models.Category, error) {
	var categories []models.Category
	err := r.db.Preload("Menus").Find(&categories).Error
	return categories, err
}
