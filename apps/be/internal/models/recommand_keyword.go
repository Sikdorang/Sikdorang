package models

type RecommandKeyword struct {
	ID       uint `gorm:"primaryKey"`
	Keyword1 string
	Keyword2 string

	RecommandMenus     []RecommandMenu     `gorm:"foreignKey:RecommandKeywordID;references:ID"`
	RecommandQuestions []RecommandQuestion `gorm:"foreignKey:RecommandKeywordID;references:ID"`
}
