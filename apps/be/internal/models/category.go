package models

type Category struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Category string 
	StoreID  uint   

	Store    Store  
	Menus    []Menu 
}