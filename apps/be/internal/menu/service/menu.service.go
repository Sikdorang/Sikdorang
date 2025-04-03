package service

import (
	"fmt"
	"be/internal/menu/dto"
	"be/internal/menu/repository"
	"be/internal/utils"
)

type MenuService interface {
	GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error)
	SyncMenus(storeID uint, syncDatas []dto.SyncMenuRequestDTO) ([]dto.SyncMenuErrorDTO, error)
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


func (s *menuService) SyncMenus(storeID uint, syncDatas []dto.SyncMenuRequestDTO) ([]dto.SyncMenuErrorDTO, error) {
	var errs []dto.SyncMenuErrorDTO

	for _, syncData := range syncDatas {
		var err error

		switch syncData.Action {
		case "create":
			menu := utils.MapToMenu(storeID, syncData.Data)
			err = s.repo.CreateMenu(menu)

		case "update":
			menu := utils.MapToMenu(storeID, syncData.Data)
			menu.ID = uint(syncData.MenuID)
			err = s.repo.UpdateMenu(menu)

		case "delete":
			err = s.repo.DeleteMenu(storeID, uint(syncData.MenuID))

		default:
			errs = append(errs, dto.SyncMenuErrorDTO{
				MenuID:  syncData.MenuID,
				Action:  syncData.Action,
				Message: "invalid action",
			})
			continue
		}

		if err != nil {
			errs = append(errs, dto.SyncMenuErrorDTO{
				MenuID:  syncData.MenuID,
				Action:  syncData.Action,
				Message: fmt.Sprintf("failed to %s menu: %v", syncData.Action, err),
			})
		}
	}

	if len(errs) > 0 {
		return errs, fmt.Errorf("one or more sync errors occurred")
	}
	return nil, nil
}
