package models

type Category struct {
    ID      uint   `gorm:"primaryKey"`
    Category    string
    StoreID uint
    Store   Store `gorm:"foreignKey:StoreID" json:"-"`
    Order string
    Menus   []Menu
}
