package dto

type ImageUploadTargetDTO struct {
	Order     string `json:"order"`
	FileURL   string `json:"fileURL"`
	UploadURL string `json:"uploadURL"`
}
