package service

import (
	"be/internal/category/repository"
	"be/internal/models"
)

type CategoryService interface {
	Create(category string, storeID uint) (models.Category, error)
	GetAllByStoreID(storeID uint) ([]models.Category, error)
}

type categoryService struct {
	repo repository.CategoryRepository
}

func NewCategoryService(r repository.CategoryRepository) CategoryService {
	return &categoryService{repo: r}
}

func (s *categoryService) Create(Category string, storeID uint) (models.Category, error) {
	category := models.Category{
		Category: Category,
		StoreID:  storeID,
	}

	if err := s.repo.Save(category); err != nil {
		return models.Category{}, err
	}
	return category, nil
}

func (s *categoryService) GetAllByStoreID(storeID uint) ([]models.Category, error) {
	return s.repo.FindByStoreID(storeID)
}