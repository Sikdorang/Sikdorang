package config

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
)

var (
	AwsRegion    string
	S3BucketName string
	S3Client     *s3.Client
)

func InitS3() {
	// .env 로드
	if err := godotenv.Load(); err != nil {
		log.Println(".env 파일 로드 실패:", err)
	}

	AwsRegion = os.Getenv("AWS_REGION")
	S3BucketName = os.Getenv("AWS_S3_BUCKET")

	awsCfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(AwsRegion),
	)
	if err != nil {
		log.Fatalf("AWS config 로드 실패: %v", err)
	}

	S3Client = s3.NewFromConfig(awsCfg)
}
