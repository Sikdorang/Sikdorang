package service

import (
	"fmt"

	"be/internal/menu/dto"
	"be/internal/menu/repository"
	"be/internal/models"
	"be/internal/utils"
)

type MenuService interface {
	GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error)
	SyncMenus(storeID uint, syncDatas []dto.SyncMenuRequestDTO) ([]dto.SyncMenuErrorDTO, error)
	GetImageURLs(storeID, menuID uint) ([]string, error)
	GetTags(storeID, menuID uint) ([]string, error)
	GetMenuBoard(storeID, categoryID uint) ([]dto.GetMenuBoardResponseDTO, error)
	GetDescription(storeID, menuID uint) (dto.GetDescriptionResponseDTO, error)
	UpdateDescription(storeID, menuID uint, body dto.UpdateDescriptionRequestDTO) (error)
	UpdateMenuOrder(storeID uint, body []dto.UpdateMenuOrderRequestDTO) error
	GetAdminMenuBoard(storeID uint) ([]dto.AdminMenuBoardDTO, error)
	DeleteMenu(storeID, menuID uint) (error)
}

type menuService struct {
	repo repository.MenuRepository
}

func NewMenuService(repo repository.MenuRepository) MenuService {
	return &menuService{
		repo: repo,
	}
}

func (s *menuService) GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error) {
	menus, err := s.repo.FindByStoreID(storeID)
	if err != nil {
		return nil, err
	}

	result := []dto.GetMenuResponseDTO{}
	for _, menu := range menus {
		result = append(result, dto.GetMenuResponseDTO{
			ID:         menu.ID,
			Menu:       menu.Menu,
			Price:      menu.Price,
			Status:     menu.Status,
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

func (s *menuService) GetImageURLs(storeID, menuID uint) ([]string, error) {
	images, err := s.repo.FindImages(storeID, menuID)
	if err != nil {
		return nil, fmt.Errorf("failed to get Image : %v", err)
	}

	urls := []string{}
	for _, img := range images {
		urls = append(urls, img.ImageURL)
	}
	return urls, nil
}

func (s *menuService) GetTags(storeID, menuID uint) ([]string, error) {
	tags, err := s.repo.FindTags(storeID, menuID)
	if err != nil {
		return nil, fmt.Errorf("failed to get Tags: %v", err)
	}

	result := []string{}
	for _, tag := range tags {
		result = append(result, tag.Tag)
	}
	return result, nil
}

func (s *menuService) GetMenuBoard(storeID, categoryID uint) ([]dto.GetMenuBoardResponseDTO, error) {
	menus, err := s.repo.FindMenuBoard(storeID, categoryID)
	if err != nil {
		return nil, err
	}

	result := []dto.GetMenuBoardResponseDTO{}
	for _, menu := range menus {
		result = append(result, s.buildMenuResponse(menu, storeID))
	}

	return result, nil
}
func (s *menuService) GetDescription(storeID, menuID uint) (dto.GetDescriptionResponseDTO, error) {
	// 메뉴 정보 조회
	menu, err := s.repo.FindDescription(storeID, menuID)
	if err != nil {
		return dto.GetDescriptionResponseDTO{}, err
	}

	// 태그 조회
	tags, err := s.repo.FindTags(storeID, menuID)
	if err != nil {
		return dto.GetDescriptionResponseDTO{}, fmt.Errorf("failed to get tags: %v", err)
	}
	var tagDTOs []dto.TagsDTO
	for _, tag := range tags {
		tagDTOs = append(tagDTOs, dto.TagsDTO{
			ID:  tag.ID,
			Tag: tag.Tag,
		})
	}

	// 이미지 조회
	images, err := s.repo.FindImages(storeID, menuID)
	if err != nil {
		return dto.GetDescriptionResponseDTO{}, fmt.Errorf("failed to get images: %v", err)
	}
	var imageDTOs []dto.ImagesDTO
	for _, img := range images {
		imageDTOs = append(imageDTOs, dto.ImagesDTO{
			ID:    img.ID,
			URL:   img.ImageURL,
			Order: img.Order,
		})
	}

	// 최종 반환 DTO 생성
	return dto.GetDescriptionResponseDTO{
		Preview: menu.Preview,
		Details: menu.Details,
		Tags:    tagDTOs,
		Images:  imageDTOs,
	}, nil
}

func (s *menuService) buildMenuResponse(menu models.Menu, storeID uint) dto.GetMenuBoardResponseDTO {
	imageURLs, _ := s.GetImageURLs(storeID, menu.ID)
	tags, _ := s.GetTags(storeID, menu.ID)
	var categoryIDVal uint
	if menu.CategoryID != nil {
		categoryIDVal = *menu.CategoryID
	}

	return dto.GetMenuBoardResponseDTO{
		ID:         menu.ID,
		Menu:       menu.Menu,
		Price:      menu.Price,
		Status:     menu.Status,
		Order:      menu.Order,
		StoreID:    menu.StoreID,
		CategoryID: categoryIDVal,
		Category:   menu.Category.Category,
		ImageURLs:  imageURLs,
		Tags:       tags,
		Details:    menu.Details,
		Preview:    menu.Preview,
	}
}

func (s *menuService) UpdateDescription(storeID, menuID uint, body dto.UpdateDescriptionRequestDTO) error {
	var execErrs []error
	
	menu, err := s.repo.FindDescription(storeID, menuID)
	if err != nil {
		return err
	}

	// Preview 처리
	if body.Preview != nil {
		menu.Preview = *body.Preview
		if err := s.repo.UpdateMenu(&menu); err != nil {
			execErrs = append(execErrs, err)
		}
	}

	// Details 처리
	if body.Details != nil {
		menu.Details = *body.Details
	} else {
		menu.Details = ""
	}
	if err := s.repo.UpdateMenu(&menu); err != nil {
		execErrs = append(execErrs, err)
	}

	// Tags 처리
	if body.Tags != nil {
		if err := s.repo.DeleteAllTags(storeID, menuID); err != nil {
			execErrs = append(execErrs, err)
		}
		newTags := utils.ConvertTagDTOsToTags(body.Tags, storeID, menuID)
		if len(newTags) > 0 {
			if err := s.repo.CreateTags(newTags); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	}

	// Images 처리
    if body.Images != nil {
        existingImages, _ := s.repo.FindImages(storeID, menuID)
        // 기존 이미지: URL 그대로 map 구성
        existingImageMap := make(map[string]models.Image)
        for _, img := range existingImages {
            existingImageMap[img.ImageURL] = img
        }
        var updateImages []models.Image
        var softDeleteImages []models.Image
        requestImageMap := make(map[string]bool)
        for _, imgDTO := range body.Images {
            var urlKey string
            if imgDTO.ID == 0 {
                // 새 이미지: storeID/menuID/ 붙여서 비교 키 생성
                urlKey = fmt.Sprintf("%d/%d/%s", storeID, menuID, imgDTO.ImageURL)
            } else {
                // 기존 이미지: URL 그대로 사용
                urlKey = imgDTO.ImageURL
            }
            requestImageMap[urlKey] = true
            if existing, ok := existingImageMap[urlKey]; ok {
                if existing.Order != imgDTO.Order {
                    existing.Order = imgDTO.Order
                    updateImages = append(updateImages, existing)
                }
            }
        }
        // 요청에 없는 기존 이미지를 soft delete 처리
        for _, img := range existingImages {
            if !requestImageMap[img.ImageURL] {
                img.Deleted = true
                softDeleteImages = append(softDeleteImages, img)
            }
        }
        if len(updateImages) > 0 {
            if err := s.repo.UpdateImages(updateImages); err != nil {
                execErrs = append(execErrs, err)
            }
        }
        if len(softDeleteImages) > 0 {
            if err := s.repo.UpdateImages(softDeleteImages); err != nil {
                execErrs = append(execErrs, err)
            }
        }
    }

	// 오류 모음 처리
	if len(execErrs) > 0 {
		return fmt.Errorf("일부 작업에서 오류가 발생했습니다: %v", execErrs)
	}
	return nil
}
func (s *menuService) UpdateMenuOrder(storeID uint, body []dto.UpdateMenuOrderRequestDTO) error {
	var menus []models.Menu

	for _, item := range body {
		menus = append(menus, models.Menu{
			ID:     item.ID,
			Order:  item.Order,
			StoreID: storeID, // 명시적으로 세팅해주는 게 좋음
		})
	}
	return s.repo.UpdateMenuOrder(storeID, menus)
}

func (s *menuService) GetAdminMenuBoard(storeID uint) ([]dto.AdminMenuBoardDTO, error) {
	categories, err := s.repo.GetCategoriesWithMenus(storeID)
	if err != nil {
		return nil, fmt.Errorf("failed to get categories: %w", err)
	}

	var result []dto.AdminMenuBoardDTO

	for _, category := range categories {
		menuDTOs := make([]dto.AdminMenuItemDTO, 0)
		
		for _, menu := range category.Menus {
			// 이미지 조회
			images, err := s.repo.FindImages(storeID, menu.ID)
			if err != nil {
				return nil, fmt.Errorf("failed to get images for menu %d: %w", menu.ID, err)
			}
			imageURLs := make([]string, 0)
			if len(images) > 0 {
				imageURLs = append(imageURLs, images[0].ImageURL)
			}

			// 태그 조회
			tags, err := s.repo.FindTags(storeID, menu.ID)
			if err != nil {
				return nil, fmt.Errorf("failed to get tags for menu %d: %w", menu.ID, err)
			}
			tagNames := make([]string, len(tags))
			for i, tag := range tags {
				tagNames[i] = tag.Tag
			}

			menuDTOs = append(menuDTOs, dto.AdminMenuItemDTO{
				MenuID: menu.ID,
				Name:   menu.Menu,
				Price:  menu.Price,
				Order:  menu.Order,
				Tags:   tagNames,
				ImageURLs: imageURLs,
				Details: menu.Details,
			})
		}

		result = append(result, dto.AdminMenuBoardDTO{
			CategoryID:   category.ID,
			CategoryName: category.Category,
			Order:        category.Order,
			Menus:        menuDTOs,
		})
	}

	return result, nil
}

func (s *menuService) DeleteMenu(storeID, menuID uint) error {
	return s.repo.DeleteMenu(storeID, menuID)
}
