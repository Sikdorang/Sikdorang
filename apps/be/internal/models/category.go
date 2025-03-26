package models

type Category struct {
    ID      uint   `gorm:"primaryKey"`
    Name    string
    StoreID uint
    Store   Store

    Menus   []Menu
}
