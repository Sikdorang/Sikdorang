package dto

type GetDescriptionResponseDTO struct {
    Preview string           `json:"preview"`
    Details string           `json:"details"`
    Tags    []TagsDTO     `json:"tags"`  
    Images  []ImagesDTO   `json:"images"`
}

type ImagesDTO struct {
	ID    uint   `json:"id"`
	URL   string `json:"url"`
	Order string    `json:"order"`
}

type TagsDTO struct {
	ID  uint   `json:"id"`
	Tag string `json:"tag"`
}