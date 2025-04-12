package service

import (
	"fmt"

	"be/internal/menu/dto"
	"be/internal/menu/repository"
	"be/internal/models"
	s3service "be/internal/s3/service"
	"be/internal/utils"
)

type MenuService interface {
	GetAllByStoreID(storeID uint) ([]dto.GetMenuResponseDTO, error)
	SyncMenus(storeID uint, syncDatas []dto.SyncMenuRequestDTO) ([]dto.SyncMenuErrorDTO, error)
	GetImageURLs(storeID, menuID uint) ([]string, error)
	GetTags(storeID, menuID uint) ([]string, error)
	GetMenuBoard(storeID, categoryID uint) ([]dto.GetMenuBoardResponseDTO, error)
	GetDescription(storeID, menuID uint) (dto.GetDescriptionResponseDTO, error)
	UpdateDescription(storeID, menuID uint, body dto.UpdateDescriptionRequestDTO) ([]dto.ImageUploadTargetDTO, error)
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
	description, err := s.repo.FindDescription(storeID, menuID)
	if err != nil {
		return dto.GetDescriptionResponseDTO{}, err
	}

	menuResponse := s.buildMenuResponse(description, storeID)

	return dto.GetDescriptionResponseDTO{
		Preview: description.Preview,
		Details: description.Details,
		Tags:    menuResponse.Tags,
		Images:  menuResponse.ImageURLs,
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
func (s *menuService) UpdateDescription(storeID, menuID uint, body dto.UpdateDescriptionRequestDTO) ([]dto.ImageUploadTargetDTO, error) {
	var execErrs []error
	var uploadTargets []dto.ImageUploadTargetDTO

	menu, err := s.repo.FindDescription(storeID, menuID)
	if err != nil {
		return nil, err
	}

	// Preview 처리
	if body.Preview != "" {
		menu.Preview = body.Preview
		if err := s.repo.UpdateMenu(&menu); err != nil {
			execErrs = append(execErrs, err)
		}
	}

	// Details 처리
	if body.Details != "" {
		menu.Details = body.Details
		if err := s.repo.UpdateMenu(&menu); err != nil {
			execErrs = append(execErrs, err)
		}
	}

	// Tags 처리
	if body.Tags != nil {
		existingTags, _ := s.repo.FindTags(storeID, menuID)
		newTags := utils.ConvertTagDTOsToTags(body.Tags, storeID, menuID)
	
		existingTagMap := map[uint]models.Tag{}
		for _, tag := range existingTags {
			existingTagMap[tag.ID] = tag
		}
	
		var createTags, updateTags, deleteTags []models.Tag
		requestTagMap := map[uint]bool{}
	
		// update or create 구분
		for _, tag := range newTags {
			if _, exists := existingTagMap[tag.ID]; exists {
				// update 대상
				updateTags = append(updateTags, tag)
				requestTagMap[tag.ID] = true
			} else {
				// create 대상
				createTags = append(createTags, tag)
			}
		}
	
		// delete 대상 : DB에는 있는데 request에 없는 것
		for _, tag := range existingTags {
			if !requestTagMap[tag.ID] {
				deleteTags = append(deleteTags, tag)
			}
		}
	
		if len(deleteTags) > 0 {
			if err := s.repo.DeleteTags(deleteTags); err != nil {
				execErrs = append(execErrs, err)
			}
		}
		if len(updateTags) > 0 {
			if err := s.repo.UpdateTags(updateTags); err != nil {
				execErrs = append(execErrs, err)
			}
		}
		if len(createTags) > 0 {
			if err := s.repo.CreateTags(createTags); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	}

	// Images 처리
	if body.Images != nil {
		existingImages, _ := s.repo.FindImages(storeID, menuID)
	
		// 기존 이미지 Map 생성 (DB 기준)
		existingImageMap := make(map[uint]models.Image)
		for _, img := range existingImages {
			existingImageMap[img.ID] = img
		}
	
		var createImages, updateImages, deleteImages []models.Image
		requestImageMap := map[uint]bool{}
	
		for _, imgDTO := range body.Images {
			// 전달받은 ID가 DB에 없다면 새로 생성해야 하는 이미지
			if imgDTO.ID == 0 || existingImageMap[imgDTO.ID].ID == 0 {
				filename := utils.GenerateFileName(imgDTO.ImageURL) // 프론트에서 보낸 파일 이름 그대로 사용
	
				uploadURL, fileURL, _ := s3service.GeneratePresignedURL(filename)
	
				uploadTargets = append(uploadTargets, dto.ImageUploadTargetDTO{
					Order:     imgDTO.Order,
					FileURL:   fileURL,
					UploadURL: uploadURL,
				})
	
				createImages = append(createImages, models.Image{
					MenuID:   menuID,
					StoreID:  storeID,
					ImageURL: fileURL,
					Order:    imgDTO.Order,
				})
			} else {
				// DB에 존재하는 ID -> 업데이트 대상
				updateImages = append(updateImages, utils.ConvertImageDTOToImage(imgDTO, storeID, menuID))
				requestImageMap[imgDTO.ID] = true
			}
		}
	
		// 삭제 대상 필터링
		for _, img := range existingImages {
			if !requestImageMap[img.ID] {
				deleteImages = append(deleteImages, img)
			}
		}
	
		// S3 파일 삭제
		for _, img := range deleteImages {
			if err := s.repo.DeleteImageFile(img.ImageURL); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	
		// DB 삭제
		if len(deleteImages) > 0 {
			if err := s.repo.DeleteImages(storeID, menuID, deleteImages); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	
		// DB 업데이트
		if len(updateImages) > 0 {
			if err := s.repo.UpdateImages(updateImages); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	
		// DB 생성
		if len(createImages) > 0 {
			if err := s.repo.CreateImages(createImages); err != nil {
				execErrs = append(execErrs, err)
			}
		}
	}
	
	// 최종 처리
	if len(execErrs) > 0 {
		return uploadTargets, fmt.Errorf("partial success: %v", execErrs)
	}
	
	return uploadTargets, nil
}
