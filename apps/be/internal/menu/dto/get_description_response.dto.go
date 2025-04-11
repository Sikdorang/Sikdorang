package dto

type GetDescriptionResponseDTO struct {
	Preview string   `json:"preview"`
	Details string   `json:"details"`
	Tags    []string `json:"tags"`
	Images  []string `json:"images"`
}
