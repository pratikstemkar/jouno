package handler

import (
	"jouno/internal/database"
	"jouno/internal/model"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func GetAllComments(c *fiber.Ctx) error {
	postID := c.Params("postID")
	db := database.DB
	var comments []model.Comment
	db.Where("post_id = ?", postID).Find(&comments)
	if len(comments) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "No Comment Found",
			"data":    nil,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Comments Found",
		"data":    comments,
	})
}

func GetComment(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var comment model.Comment
	db.Find(&comment, "id = ?", id)
	if comment.Text == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "No Comment found with ID",
			"data":    nil,
		})
	}
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Comment Found",
		"data":    comment,
	})
}

func CreateComment(c *fiber.Ctx) error {
	type NewComment struct {
		Text string `json:"text"`
	}

	db := database.DB
	comment := new(model.Comment)
	if err := c.BodyParser(comment); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	uid := string(claims["id"].(string))
	postID := c.Params("postID")

	var user model.User
	db.Find(&user, "id = ?", uid)
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Error fetching user of this comment",
			"data":    nil,
		})
	}

	var post model.Post
	db.Find(&post, "id = ?", postID)
	if post.Title == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Error fetching post of this comment",
			"data":    nil,
		})
	}

	comment.Post = post
	comment.User = user
	if err := db.Create(&comment).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create comment",
			"data":    err,
		})
	}

	newComment := NewComment{
		Text: comment.Text,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Comment Created",
		"data":    newComment,
	})
}

func DeleteComment(c *fiber.Ctx) error {
	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	db := database.DB
	var comment model.Comment
	db.First(&comment, "id = ?", id)

	if !validToken(token, string(comment.UserID.String())) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid Token ID",
			"data":    nil,
		})
	}

	db.Delete(&comment)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Comment deleted successfully",
		"data":    nil,
	})
}
