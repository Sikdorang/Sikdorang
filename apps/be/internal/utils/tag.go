package utils

import (
	"be/internal/menu/dto"
	"be/internal/models"
)

func ConvertTagDTOsToTags(tagDTOs []dto.TagDTO, storeID, menuID uint) []models.Tag {
	var tags []models.Tag
	for _, t := range tagDTOs {
		tags = append(tags, models.Tag{
			ID:      t.ID,
			Tag:     t.Tag,
			StoreID: storeID,
			MenuID:  menuID,
		})
	}
	return tags
}

func FindDeletedTags(existing []models.Tag, request []models.Tag) []models.Tag {
	requestMap := make(map[uint]bool)
	for _, tag := range request {
		if tag.ID != 0 {
			requestMap[tag.ID] = true
		}
	}

	var deleted []models.Tag
	for _, tag := range existing {
		if !requestMap[tag.ID] {
			deleted = append(deleted, tag)
		}
	}
	return deleted
}

func FindNewTags(request []models.Tag) []models.Tag {
	var newTags []models.Tag
	for _, tag := range request {
		if tag.ID == 0 {
			newTags = append(newTags, tag)
		}
	}
	return newTags
}
