package main

import (
	"fmt"
	"jouno/internal/config"
	"jouno/internal/database"
	"jouno/internal/router"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	database.ConnectDB()

	router.SetupRoutes(app)
	port, _ := strconv.Atoi(config.Config("PORT"))
	err := app.Listen(fmt.Sprintf(":%d", port))
	if err != nil {
		panic("Cannot start server.")
	}
}
