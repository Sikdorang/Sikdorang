package repository

import (
	"be/internal/models"
	"gorm.io/gorm"
)

type MenuRepository interface {
	FindByStoreID(storeID uint) ([]models.Menu, error)
	CreateMenu(menu *models.Menu) error
	UpdateMenu(menu *models.Menu) error
	DeleteMenu(menuID uint, storeID uint) error
	FindImages(storeID, menuID uint) ([]models.Image, error)
	FindTags(storeID, menuID uint) ([]models.Tag, error)
	FindMenuBoard(storeID, categoryID uint) ([]models.Menu, error)
	FindDescription(storeID, menuID uint) (models.Menu, error)
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
		Select("id", "menu", "price", "status", "`order`", "store_id", "category_id").
		Where("store_id = ?", storeID).
		Find(&menus).Error

	return menus, err
}

func (r *menuRepository) CreateMenu(menu *models.Menu) error {
	return r.db.Create(menu).Error
}

func (r *menuRepository) UpdateMenu(menu *models.Menu) error {
	return r.db.Save(menu).Error
}

func (r *menuRepository) DeleteMenu(storeID uint, menuID uint) error {
	return r.db.
		Where("id = ? AND store_id = ?", menuID, storeID).
		Delete(&models.Menu{}).Error
}

func (r *menuRepository) FindImages(storeID, menuID uint) ([]models.Image, error) {
	var images []models.Image
	result := r.db.Where("store_id = ? AND menu_id = ?", storeID, menuID).
		Order("`order` ASC").
		Find(&images)
	return images, result.Error
}

func (r *menuRepository) FindTags(storeID, menuID uint) ([]models.Tag, error) {
	var tags []models.Tag
	result := r.db.Where("store_id = ? AND menu_id = ?", storeID, menuID).
		Find(&tags)
	return tags, result.Error
}

func (r *menuRepository) FindMenuBoard(storeID, categoryID uint) ([]models.Menu, error) {
	var menus []models.Menu
	result := r.db.Preload("Category").
		Where("store_id = ? AND category_id = ?", storeID, categoryID).
		Order("`order` ASC").
		Find(&menus)
	return menus, result.Error
}

func (r *menuRepository) FindDescription(storeID, menuID uint) (models.Menu, error) {
	var menu models.Menu
	err := r.db.
		Preload("Category").
		Where("store_id = ? AND id = ?", storeID, menuID).
		First(&menu).Error

	return menu, err
}
