package models

type Tag struct {
    ID           uint   `gorm:"primaryKey"`
	Tag			 string
	MenuID  uint
    Menu    Menu
	StoreID  uint
    Store    Store
}
