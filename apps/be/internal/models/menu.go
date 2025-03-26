package models

type Menu struct {
    ID          uint   `gorm:"primaryKey"`
    Name        string
    Preview     string
    Details     string
    Price       int
    CategoryID  uint
    Category    Category
    StoreID     uint
    Store       Store
    SoldOut     bool

    Images         []Image
    RecommandMenus []RecommandMenu
}
