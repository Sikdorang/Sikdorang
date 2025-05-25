package service

import (
	"be/internal/notification/gateway"
)

type NotificationService struct {
	hub *gateway.Hub
}

func NewNotificationService(hub *gateway.Hub) *NotificationService {
	return &NotificationService{hub: hub}
}

func (n *NotificationService) InvalidateCategoryCache(storeID string) {
	payload := map[string]string{
		"message": "delete caching data",
	}

	n.hub.SendToStore(storeID, payload)
}
