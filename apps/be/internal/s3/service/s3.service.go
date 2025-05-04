package service

import (
	"context"
	"fmt"
	"time"

	"be/config"
	"be/internal/models"
	"be/internal/s3/repository"

	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service interface {
	GeneratePresignedURL(storeID, menuID int, filename string) (string, error)
}

type s3Service struct {
	repo repository.S3Repository
}

func NewS3Service(repo repository.S3Repository) S3Service {
	return &s3Service{repo: repo}
}

func (s *s3Service) GeneratePresignedURL(storeID, menuID int, filename string) (string, error) {
	// S3 키 구성: store/1/menu/42/filename.jpg
	key := fmt.Sprintf("%d/%d/%s", storeID, menuID, filename)

	// presigned URL 생성
	presigner := s3.NewPresignClient(config.S3Client)
	req, err := presigner.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &config.S3BucketName,
		Key:    &key,
	}, func(po *s3.PresignOptions) {
		po.Expires = 15 * time.Minute
	})
	if err != nil {
		return "", fmt.Errorf("presigned URL 생성 실패: %w", err)
	}

	// DB에 파일 이름만 저장
	image := &models.Image{
		ImageURL: key,
		MenuID:   uint(menuID),
		StoreID:  uint(storeID),
		Deleted:  false,
	}

	if err := s.repo.Save(image); err != nil {
		return "", fmt.Errorf("DB 저장 실패: %w", err)
	}

	return req.URL, nil
}
