package service

import (
	"be/internal/models"
	"be/internal/category/repository"
)

type CategoryService interface {
	GetAll() ([]models.Category, error)
}

type categoryService struct {
	repo repository.CategoryRepository
}

func NewCategoryService(r repository.CategoryRepository) CategoryService {
	return &categoryService{repo: r}
}

func (s *categoryService) GetAll() ([]models.Category, error) {
	return s.repo.FindAll()
}
