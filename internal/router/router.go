package router

import (
	"jouno/internal/handler"
	"jouno/internal/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	v1 := api.Group("/v1")
	v1.Get("/", handler.HelloHandler)
	v1.Get("/health", handler.HealthHandler)

	user := v1.Group("/user")
	user.Post("", handler.CreateUser)
	user.Get("/:id", handler.GetUser)
	user.Put("/:id", middleware.Protected(), handler.UpdateUser)
	user.Delete("/:id", middleware.Protected(), handler.DeleteUser)
	user.Post("/:id/role/:roleName", handler.AddRoleToUser)

	profile := v1.Group("/profile")
	profile.Get("/:id", handler.GetProfile)
	profile.Put("/:id", middleware.Protected(), handler.UpdateUser)

	role := v1.Group("/role")
	role.Post("", handler.CreateRole)
	role.Get("/:id", handler.GetRole)
	role.Put("/:id", handler.UpdateRole)
	role.Delete("/:id", handler.DeleteRole)

	auth := v1.Group("/auth")
	auth.Post("/login", handler.Login)
	auth.Post("/register", handler.CreateUser)
	auth.Get("/:id", middleware.Protected(), handler.CheckTokenAuth)

	post := v1.Group("/post")
	post.Post("", middleware.Protected(), handler.CreatePost)
	post.Get("", handler.GetAllPosts)
	post.Get("/:id", handler.GetPost)
	post.Delete("/:id", middleware.Protected(), handler.DeletePost)

	comment := v1.Group("/comment")
	post.Post("/:postID/comment", middleware.Protected(), handler.CreateComment)
	post.Get("/:postID/comments", handler.GetAllComments)
	comment.Get("/:id", handler.GetComment)
	comment.Delete("/:id", middleware.Protected(), handler.DeleteComment)
}
