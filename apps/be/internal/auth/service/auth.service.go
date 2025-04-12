package service

import (
	"be/internal/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService interface {
	Login(userId, password string) (models.Store, error)
	SaveRefreshToken(storeId uint, token string) error
	GetStoreById(storeId uint) (models.Store, error)
}

type authService struct {
	db *gorm.DB
}

func NewAuthService(db *gorm.DB) AuthService {
	return &authService{db: db}
}

func (s *authService) Login(userId, password string) (models.Store, error) {
	var store models.Store
	if err := s.db.Where("user_id = ?", userId).First(&store).Error; err != nil {
		return models.Store{}, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(store.Password), []byte(password)); err != nil {
		return models.Store{}, err
	}
	return store, nil
}

func (s *authService) SaveRefreshToken(storeId uint, token string) error {
	return s.db.Model(&models.Store{}).
		Where("id = ?", storeId).
		Update("refresh_token", token).Error
}

func (s *authService) GetStoreById(storeId uint) (models.Store, error) {
	var store models.Store
	err := s.db.First(&store, storeId).Error
	return store, err
}
