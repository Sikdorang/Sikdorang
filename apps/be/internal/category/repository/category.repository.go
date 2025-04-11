package repository

import (
	"be/internal/models"
	"gorm.io/gorm"
)

type CategoryRepository interface {
	Save(category *models.Category) error
	FindByStoreID(storeID uint) ([]models.Category, error)
	FindByIDAndStoreID(id uint, storeID uint) (models.Category, error)
	Update(category models.Category) error
	Delete(categoryID uint, storeID uint) error
}

type categoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) Save(category *models.Category) error {
	return r.db.Create(category).Error
}

func (r *categoryRepository) FindByStoreID(storeID uint) ([]models.Category, error) {
	var categories []models.Category
	if err := r.db.Where("store_id = ?", storeID).Order("`order` ASC").Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

func (r *categoryRepository) FindByIDAndStoreID(id uint, storeID uint) (models.Category, error) {
	var category models.Category
	err := r.db.Where("id = ? AND store_id = ?", id, storeID).First(&category).Error
	return category, err
}

func (r *categoryRepository) Update(category models.Category) error {
	return r.db.Save(&category).Error
}

func (r *categoryRepository) Delete(categoryID uint, storeID uint) error {
	return r.db.Where("id = ? AND store_id = ?", categoryID, storeID).Delete(&models.Category{}).Error
}
