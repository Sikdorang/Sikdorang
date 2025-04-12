package models

type RecommandQuestion struct {
	ID                 uint `gorm:"primaryKey"`
	Question           string
	RecommandKeywordID uint
	RecommandKeyword   RecommandKeyword `gorm:"foreignKey:RecommandKeywordID;references:ID"`
}
