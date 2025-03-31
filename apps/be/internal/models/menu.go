package models

type Menu struct {
    ID          uint   `gorm:"primaryKey"`
    Menu        string
    Preview     string
    Details     string
    Price       int
    CategoryID  uint
    Category    Category
    StoreID     uint
    Store       Store
    SoldOut     bool
    order       int

    Images         []Image
    RecommandMenus []RecommandMenu
}
