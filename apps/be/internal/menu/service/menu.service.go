package service

import (
	"be/internal/menu/dto"
	"be/internal/menu/repository"
)

type MenuService interface {
	GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error)
}

type menuService struct {
	repo repository.MenuRepository
}

func NewMenuService(repo repository.MenuRepository) MenuService {
	return &menuService{repo: repo}
}

func (s *menuService) GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error) {
	menus, err := s.repo.FindByStoreID(storeID)
	if err != nil {
		return nil, err
	}

	var result []dto.GetMenuResponseDTO
	for _, menu := range menus {
		result = append(result, dto.GetMenuResponseDTO{
			ID:         menu.ID,
			Menu:       menu.Menu,
			Price:      menu.Price,
			SoldOut:    menu.SoldOut,
			Order:      menu.Order,
			StoreID:    menu.StoreID,
			CategoryID: menu.CategoryID,
			Category:   menu.Category.Category,
		})
	}
	return result, nil
}
