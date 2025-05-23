package service

import (
	"errors"
	"strconv"

	"gorm.io/gorm"

	"be/internal/category/repository"
	"be/internal/models"
	"be/internal/category/dto"
	"be/internal/ws/gateway"
)

var ErrCategoryNotFound = errors.New("category not found")

type CategoryService interface {
	Create(category string, order string, storeID uint) (models.Category, error)
	GetAllByStoreID(storeID uint) ([]models.Category, error)
	Update(categoryID uint, storeID uint, newCategory string) (models.Category, error)
	Delete(categoryID uint, storeID uint) error
	UpdateCategoryOrder(storeID uint, body []dto.UpdateCategoryOrderRequestDTO) error
}

type categoryService struct {
	repo repository.CategoryRepository
	hub *gateway.Hub
}

func NewCategoryService(repo repository.CategoryRepository, hub *gateway.Hub) CategoryService {
	return &categoryService{repo: repo, hub: hub}

func (s *categoryService) Create(category string, order string, storeID uint) (models.Category, error) {
	newCategory := &models.Category{
		Category: category,
		Order: order,
		StoreID:  storeID,
	}

	if err := s.repo.Save(newCategory); err != nil {
		return models.Category{}, err
	}

	s.hub.SendMessage(storeID, map[string]interface{}{
		"type":   "invalidate",
		"target": "category",
	})

	return *newCategory, nil
}

func (s *categoryService) GetAllByStoreID(storeID uint) ([]models.Category, error) {
	categories, err := s.repo.FindByStoreID(storeID)
	if err != nil {
		return nil, err
	}

	result := []models.Category{}
	result = append(result, categories...)

	return result, nil
}

func (s *categoryService) Update(categoryID uint, storeID uint, newCategory string) (models.Category, error) {
	existingCategory, err := s.repo.FindByIDAndStoreID(categoryID, storeID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return models.Category{}, ErrCategoryNotFound
		}
		return models.Category{}, err
	}

	existingCategory.Category = newCategory

	if err := s.repo.Update(existingCategory); err != nil {
		return models.Category{}, err
	}

	s.hub.SendMessage(storeID, map[string]interface{}{
		"type":   "invalidate",
		"target": "category",
	})

	return existingCategory, nil
}

func (s *categoryService) Delete(categoryID uint, storeID uint) error {
	_, err := s.repo.FindByIDAndStoreID(categoryID, storeID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ErrCategoryNotFound
		}
		return err
	}

	if err := s.repo.Delete(categoryID, storeID); err != nil {
		return err
	}

	s.hub.SendMessage(storeID, map[string]interface{}{
		"type":   "invalidate",
		"target": "category",
	})

	return nil
}

func (s *categoryService) UpdateCategoryOrder(storeID uint, body []dto.UpdateCategoryOrderRequestDTO) error {
	var categories []models.Category

	// body에서 받은 데이터를 categories 배열에 추가
	for _, item := range body {
		categories = append(categories, models.Category{
			ID:      item.ID,
			Order:   item.Order,
			StoreID: storeID, // 명시적으로 StoreID를 설정
		})
	}

	s.hub.SendMessage(storeID, map[string]interface{}{
		"type":   "invalidate",
		"target": "category",
	})

	return s.repo.UpdateCategoryOrder(storeID, categories)
}