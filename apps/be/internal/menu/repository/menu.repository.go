package repository

import (
	"be/internal/models"
	"context"
	"gorm.io/gorm"
	"strings"

	"be/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
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

	UpdateImages(images []models.Image) error
	CreateImages(images []models.Image) error
	DeleteImageFile(imageURL string) error

	DeleteAllTags(storeID, menuID uint) error
	CreateTags(tags []models.Tag) error
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
	result := r.db.Where("store_id = ? AND menu_id = ? AND deleted = false", storeID, menuID).
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

// 이미지 업데이트
func (r *menuRepository) UpdateImages(images []models.Image) error {
	for _, img := range images {
		// 이미지 update 로직 (DB에서 해당 이미지 업데이트)
		if err := r.db.Save(&img).Error; err != nil {
			return err
		}
	}
	return nil
}

// 이미지 생성
func (r *menuRepository) CreateImages(images []models.Image) error {
	for _, img := range images {
		// 이미지 insert 로직 (DB에 추가)
		if err := r.db.Create(&img).Error; err != nil {
			return err
		}
	}
	return nil
}

// 이미지 S3 삭제 (S3 연동 자리)
func (r *menuRepository) DeleteImageFile(imageURL string) error {
	key := strings.Replace(imageURL, "https://"+config.S3BucketName+".s3."+config.AwsRegion+".amazonaws.com/", "", 1)

	_, err := config.S3Client.DeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String(config.S3BucketName),
		Key:    aws.String(key),
	})

	return err
}

// 태그 생성
func (r *menuRepository) CreateTags(tags []models.Tag) error {
	return r.db.Create(&tags).Error
}

func (r *menuRepository) DeleteAllTags(storeID, menuID uint) error {
	return r.db.Where("store_id = ? AND menu_id = ?", storeID, menuID).Delete(&models.Tag{}).Error
}
