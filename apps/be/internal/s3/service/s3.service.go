package service

import (
	"context"
	"fmt"
	"time"

	"be/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// S3 전용 상수
const (
	s3UploadPrefix = "uploads/"
	s3ObjectACL    = "public-read"
	s3URLFormat    = "https://%s.s3.%s.amazonaws.com/%s%s"
)

// S3 삭제
func DeleteImageFromS3(filename string) error {
	_, err := config.S3Client.DeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String(config.S3BucketName),
		Key:    aws.String(s3UploadPrefix + filename),
	})

	return err
}

// Presigned URL 발급 (S3 업로드 전용)
func GeneratePresignedURL(filename string) (uploadURL string, fileURL string, err error) {
	presignClient := s3.NewPresignClient(config.S3Client)

	key := s3UploadPrefix + filename
	req, err := presignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(config.S3BucketName),
		Key:    aws.String(key),
		ACL:    s3ObjectACL,
	}, s3.WithPresignExpires(5*time.Minute))

	if err != nil {
		return "", "", err
	}

	fileURL = fmt.Sprintf(s3URLFormat, config.S3BucketName, config.AwsRegion, s3UploadPrefix, filename)
	return req.URL, fileURL, nil
}
