package models

type Image struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	ImageURL string 

	MenuID   uint   
	StoreID  uint   

	Menu     Menu   
	Store    Store  
}
