package models

type Store struct {
	ID          uint      `gorm:"primaryKey"`
	Store       string
	Address     string
	LoginID     string
	Password    string
	StoreNumber string
	Manager     string
	PhoneNumber string
	Approved    bool

	Categories  []Category
	Menus       []Menu
	Images      []Image
}