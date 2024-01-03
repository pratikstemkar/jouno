package handler

import (
	"jouno/internal/database"
	"jouno/internal/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func GetAllPosts(c *fiber.Ctx) error {
	db := database.DB
	var posts []model.Post
	db.Find(&posts)
	if len(posts) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "No Post Found",
			"data":    nil,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Posts Found",
		"data":    posts,
	})
}

func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var post model.Post
	db.Find(&post, "id = ?", id)
	if post.Title == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "No Post found with ID",
			"data":    nil,
		})
	}
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Post Found",
		"data":    post,
	})
}

func CreatePost(c *fiber.Ctx) error {
	type NewPost struct {
		Title string `json:"title"`
		Body  string `json:"body"`
		Image string `json:"image"`
	}

	db := database.DB
	post := new(model.Post)
	if err := c.BodyParser(post); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	uid := string(claims["id"].(string))

	var user model.User
	db.Find(&user, "id = ?", uid)
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Error fetching user of this post",
			"data":    nil,
		})
	}

	post.User = user
	if err := db.Create(&post).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create post",
			"data":    err,
		})
	}

	newPost := NewPost{
		Title: post.Title,
		Body:  post.Body,
		Image: post.Image,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Post Created",
		"data":    newPost,
	})
}

func DeletePost(c *fiber.Ctx) error {
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	db := database.DB
	var post model.Post
	db.First(&post, "id = ?", id)

	if !validToken(token, string(post.UserID.String())) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid Token ID",
			"data":    nil,
		})
	}
	db.Delete(&post)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Post deleted successfully",
		"data":    nil,
	})
}
