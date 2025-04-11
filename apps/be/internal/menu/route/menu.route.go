package menu

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"be/internal/menu/controller"
	"be/internal/menu/service"
	"be/internal/menu/repository"
	"be/internal/middleware"
)

func InitMenuRoutes(router fiber.Router, db *gorm.DB) {
	repo := repository.NewMenuRepository(db)
	svc := service.NewMenuService(repo)
	ctrl := controller.NewMenuController(svc)

	group := router.Group("/menus", middleware.JWTProtected())

	// ✅ 여기에 API들 등록
	group.Get("/", ctrl.GetMenus)        // GET /api/menus
	group.Post("/", ctrl.SyncMenus)      // POST /api/menus/
	group.Get("/board/:categoryID", ctrl.GetMenuBoard)
	group.Get("/:menuID", ctrl.GetDescription)
	group.Patch("/:menuID", ctrl.UpdateDescription)
//	group.Post("/", ctrl.CreateMenus)      // POST /api/menus
//	group.Patch("/:menuId", ctrl.UpdateMenus)    // PUT /api/menus/:id
//	group.Delete("/:menuId", ctrl.DeleteMenus) // DELETE /api/menus/:id
}
