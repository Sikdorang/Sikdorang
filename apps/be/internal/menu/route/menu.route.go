package menu

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/menu/controller"
	"be/internal/menu/repository"
	"be/internal/menu/service"
	"be/internal/middleware"
	"be/internal/ws/gateway"
)

func InitMenuRoutes(router fiber.Router, db *gorm.DB, hub *gateway.Hub) {
	repo := repository.NewMenuRepository(db)
	svc := service.NewMenuService(repo, hub)
	ctrl := controller.NewMenuController(svc)

	group := router.Group("/menus", middleware.JWTProtected())

	// ✅ 여기에 API들 등록
	group.Get("/board/admin", ctrl.GetAdminMenuBoard)
	group.Patch("/order", ctrl.UpdateMenuOrder)
	group.Get("/", ctrl.GetMenus)   // GET /api/menus
	group.Post("/", ctrl.SyncMenus) // POST /api/menus/
	group.Get("/board/:categoryID", ctrl.GetMenuBoard)
	group.Get("/:menuID", ctrl.GetDescription)
	group.Patch("/:menuID", ctrl.UpdateDescription)
	group.Delete("/:menuID", ctrl.DeleteMenu)
}
