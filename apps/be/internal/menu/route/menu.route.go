package menu

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/menu/controller"
	"be/internal/menu/repository"
	"be/internal/menu/service"
	"be/internal/middleware"
	notification "be/internal/notification/service"
)

func InitMenuRoutes(router fiber.Router, db *gorm.DB, notify *notification.NotificationService) {
	repo := repository.NewMenuRepository(db)
	svc := service.NewMenuService(repo, notify) 
	ctrl := controller.NewMenuController(svc)

	group := router.Group("/menus", middleware.JWTProtected())

	group.Get("/board/admin", ctrl.GetAdminMenuBoard)
	group.Patch("/order", ctrl.UpdateMenuOrder)
	group.Get("/", ctrl.GetMenus)
	group.Post("/", ctrl.SyncMenus)
	group.Get("/board/:categoryID", ctrl.GetMenuBoard)
	group.Get("/:menuID", ctrl.GetDescription)
	group.Patch("/:menuID", ctrl.UpdateDescription)
	group.Delete("/:menuID", ctrl.DeleteMenu)
}