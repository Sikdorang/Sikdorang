package models

type Menu struct {
    ID       uint   `gorm:"primaryKey"`
    Menu     string
    Preview  string
    Details  string
    Price    int

    CategoryID *uint
    Category   Category `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

    StoreID uint
    Store   Store

    SoldOut bool
    Order   int

    Images         []Image
    RecommandMenus []RecommandMenu
}
