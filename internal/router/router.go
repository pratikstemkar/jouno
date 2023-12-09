package router

import (
	"jouno/internal/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	v1 := api.Group("/v1")
	v1.Get("/", handler.HelloHandler)
	v1.Get("/health", handler.Health)

	v1.Post("/user", handler.CreateUser)

	auth := v1.Group("/auth")
	auth.Post("/login", handler.Login)
}
