package handler

import (
	"jouno/internal/database"
	"jouno/internal/model"

	"github.com/gofiber/fiber/v2"
)

func GetRole(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var role model.Role
	db.Find(&role, "id = ?", id)
	if role.Name == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "No Role found with ID",
			"data":    nil,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Role Found",
		"data":    role,
	})
}

func CreateRole(c *fiber.Ctx) error {
	type NewRole struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	db := database.DB
	role := new(model.Role)
	if err := c.BodyParser(role); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	if err := db.Create(&role).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create role",
			"data":    err,
		})
	}

	newRole := NewRole{
		Name:        role.Name,
		Description: role.Description,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Role created",
		"data":    newRole,
	})
}

func UpdateRole(c *fiber.Ctx) error {
	type UpdateRoleInput struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	var uri UpdateRoleInput
	if err := c.BodyParser(&uri); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	id := c.Params("id")
	db := database.DB
	var role model.Role

	db.First(&role, "id = ?", id)
	if role.Name == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Role not found with ID",
			"data":    nil,
		})
	}
	role.Name = uri.Name
	role.Description = uri.Description
	db.Save(&role)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Role updated successfully",
		"data":    role,
	})
}

func DeleteRole(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var role model.Role

	db.First(&role, "id = ?", id)
	if role.Name == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Role not found with ID",
			"data":    nil,
		})
	}
	db.Delete(&role)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Role deleted successfully",
		"data":    nil,
	})
}
