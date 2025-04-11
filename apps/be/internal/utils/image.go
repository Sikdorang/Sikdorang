package utils

import "be/internal/models"
import "be/internal/menu/dto"

func ConvertImageDTOsToImages(imageDTOs []dto.ImageDTO, storeID, menuID uint) []models.Image {
	var images []models.Image
	for _, img := range imageDTOs {
		images = append(images, models.Image{
			ID:       img.ID,
			ImageURL: img.ImageURL,
			Order:    img.Order,
			StoreID:  storeID,
			MenuID:   menuID,
		})
	}
	return images
}

func FindDeletedImages(existing []models.Image, request []models.Image) []models.Image {
	requestMap := make(map[uint]bool)
	for _, img := range request {
		if img.ID != 0 {
			requestMap[img.ID] = true
		}
	}

	var deleted []models.Image
	for _, img := range existing {
		if !requestMap[img.ID] {
			deleted = append(deleted, img)
		}
	}
	return deleted
}

func FindUpdatedImages(existing []models.Image, request []models.Image) []models.Image {
	existingMap := make(map[uint]models.Image)
	for _, img := range existing {
		existingMap[img.ID] = img
	}

	var updated []models.Image
	for _, img := range request {
		if img.ID != 0 {
			if ex, ok := existingMap[img.ID]; ok {
				if ex.Order != img.Order || ex.ImageURL != img.ImageURL {
					updated = append(updated, img)
				}
			}
		}
	}
	return updated
}

func FindNewImages(request []models.Image) []models.Image {
	var newImages []models.Image
	for _, img := range request {
		if img.ID == 0 {
			newImages = append(newImages, img)
		}
	}
	return newImages
}
