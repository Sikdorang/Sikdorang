package models

type Store struct {
    ID           uint   `gorm:"primaryKey"`
    Store        string
    Address      string
    UserID       string
    Password     string
    StoreNumber  string
    Manager      string
    PhoneNumber  string
    Approved     bool
    Paid         bool

    Categories   []Category
    Menus        []Menu
    Images       []Image
    RecommandMenus []RecommandMenu
}
