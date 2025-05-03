package repository

import (
	"be/internal/models"

	"gorm.io/gorm"
)

type S3Repository interface {
	Save(image *models.Image) error
}

type s3Repository struct {
	db *gorm.DB
}

func NewS3Repository(db *gorm.DB) S3Repository {
	return &s3Repository{db: db}
}

func (r *s3Repository) Save(image *models.Image) error {
	return r.db.Create(image).Error
}
