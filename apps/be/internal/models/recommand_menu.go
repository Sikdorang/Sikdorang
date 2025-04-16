package models

type RecommandMenu struct {
	ID                 uint `gorm:"primaryKey"`
	StoreID            uint
	Store              Store
	MenuID             uint
	Menu               Menu
	Score              int
	RecommandKeywordID uint
	RecommandKeyword   RecommandKeyword `gorm:"foreignKey:RecommandKeywordID;references:ID"`
}
