package repository

import (
	"gorm.io/gorm"
	"be/internal/models"
)

type MenuRepository interface {
	FindByStoreID(storeID uint) ([]models.Menu, error)
	CreateMenu(menu *models.Menu) error
	UpdateMenu(menu *models.Menu) error
	DeleteMenu(menuID uint, storeID uint) error
}

type menuRepository struct {
	db *gorm.DB
}

func NewMenuRepository(db *gorm.DB) MenuRepository {
	return &menuRepository{db: db}
}

// FindByStoreID: StoreID로 메뉴 리스트 조회 (카테고리 포함)
func (r *menuRepository) FindByStoreID(storeID uint) ([]models.Menu, error) {
	var menus []models.Menu
	err := r.db.
		Preload("Category").
		Select("id", "menu", "price", "sold_out", "`order`", "store_id", "category_id").
		Where("store_id = ?", storeID).
		Find(&menus).Error

	return menus, err
}

// Create: 메뉴 생성
func (r *menuRepository) CreateMenu(menu *models.Menu) error {
	return r.db.Create(menu).Error
}

// Update: 메뉴 정보 갱신
func (r *menuRepository) UpdateMenu(menu *models.Menu) error {
	return r.db.Save(menu).Error
}

// Delete: 메뉴 삭제 (storeID 조건 포함)
func (r *menuRepository) DeleteMenu(storeID uint, menuID uint) error {
	return r.db.
		Where("id = ? AND store_id = ?", menuID, storeID).
		Delete(&models.Menu{}).Error
}
