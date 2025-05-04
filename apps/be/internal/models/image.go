package models

type Image struct {
	ID       uint `gorm:"primaryKey"`
	ImageURL string
	MenuID   uint
	Menu     Menu
	StoreID  uint
	Store    Store
	Order    string
	Deleted  bool `gorm:"default:false"`
}
