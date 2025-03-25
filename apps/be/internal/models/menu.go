package models

type Menu struct {
	ID         uint   `gorm:"primaryKey"`
	Menu       string
	Preview    string
	Details    string
	Price      int
	SoldOut    bool

	StoreID    uint
	Store      Store

	CategoryID uint
	Category   Category

	Images     []Image
}
