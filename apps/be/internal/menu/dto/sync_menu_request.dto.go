package dto

type SyncMenuRequestDTO struct {
	Action string         `json:"action"`
	MenuID int            `json:"id"`
	Data   map[string]any `json:"data"`
}
