package dto

type SyncMenuErrorDTO struct {
	MenuID  int    `json:"menuId"`
	Action  string `json:"action"`
	Message string `json:"message"`
}
