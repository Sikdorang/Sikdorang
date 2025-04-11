package dto


type UpdateDescriptionRequestDTO struct {
	Preview string    `json:"preview"`
	Details string    `json:"details"`
	Tags    []TagDTO  `json:"tags"`
	Images  []ImageDTO `json:"images"`
}

type TagDTO struct {
	ID  uint   `json:"id"`
	Tag string `json:"tag"`
}

type ImageDTO struct {
	ID       uint   `json:"id"`
	ImageURL string `json:"image_url"`
	Order    string `json:"order"`
}
