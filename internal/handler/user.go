package handler

import (
	"jouno/internal/database"
	"jouno/internal/model"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
	claims := t.Claims.(jwt.MapClaims)
	uid := string(claims["id"].(string))

	return uid == id
}

func validUser(id string, p string) bool {
	db := database.DB
	var user model.User
	db.First(&user, "id = ?", id)
	if user.Username == "" {
		return false
	}
	if !CheckPasswordHash(p, user.Password) {
		return false
	}
	return true
}

func validRole(t *jwt.Token, roleName string) bool {
	claims := t.Claims.(jwt.MapClaims)
	roles := claims["roles"].([]interface{})
	roleList := roles
	for _, role := range roleList {
		if role.(string) == roleName {
			return true
		}
	}
	return false
}

func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var user model.User
	db.Preload("Roles").Find(&user, "id = ?", id)
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{
			"status":  "error",
			"message": "No User found with ID",
			"data":    nil,
		})
	}
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User Found",
		"data":    user,
	})
}

func GetProfile(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var user model.User
	db.Preload("Roles").Find(&user, "username = ?", id)
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{
			"status":  "error",
			"message": "No User found with ID",
			"data":    nil,
		})
	}
	type Profile struct {
		ID        uuid.UUID `json:"id"`
		Username  string    `json:"username"`
		Email     string    `json:"email"`
		Name      string    `json:"name"`
		Bio       string    `json:"bio"`
		Location  string    `json:"location"`
		Pronouns  string    `json:"pronouns"`
		Website   string    `json:"website"`
		Gender    string    `json:"gender"`
		Avatar    string    `json:"avatar"`
		Banner    string    `json:"banner"`
		Verified  bool      `json:"verified"`
		CreatedAt time.Time
	}
	var profile Profile
	profile.ID = user.ID
	profile.Username = user.Username
	profile.Email = user.Email
	profile.Name = user.Name
	profile.Bio = user.Bio
	profile.Location = user.Location
	profile.Pronouns = user.Pronouns
	profile.Website = user.Website
	profile.Gender = user.Gender
	profile.Avatar = user.Avatar
	profile.Banner = user.Banner
	profile.Verified = user.Verified
	profile.CreatedAt = user.CreatedAt
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Profile Found",
		"data":    profile,
	})
}

func CreateUser(c *fiber.Ctx) error {
	type NewUser struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}

	db := database.DB
	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create user",
			"data":    err,
		})
	}

	var role model.Role
	db.Find(&role, "name = ?", "user")
	if role.Name == "" {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Error fetching role to add to user",
			"data":    err,
		})
	}
	user.Roles = append(user.Roles, role)
	user.Avatar = "https://i.pinimg.com/1200x/63/17/29/631729e14e006e3616471749d8336eac.jpg"
	user.Password = hash
	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Couldn't create user",
			"data":    err,
		})
	}

	newUser := NewUser{
		Email:    user.Email,
		Username: user.Username,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User created",
		"data":    newUser,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	type UpdateUserInput struct {
		Name     string `json:"name"`
		Pronouns string `json:"pronouns"`
		Banner   string `json:"banner"`
		Avatar   string `json:"avatar"`
		Gender   string `json:"gender"`
		Bio      string `json:"bio"`
		Website  string `json:"website"`
		Location string `json:"location"`
	}

	var uui UpdateUserInput
	if err := c.BodyParser(&uui); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid token id",
			"data":    nil,
		})
	}

	db := database.DB
	var user model.User

	db.First(&user, "id = ?", id)
	user.Name = uui.Name
	user.Pronouns = uui.Pronouns
	user.Banner = uui.Banner
	user.Avatar = uui.Avatar
	user.Gender = uui.Gender
	user.Bio = uui.Bio
	user.Website = uui.Website
	user.Location = uui.Location
	db.Save(&user)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User updated successfully",
		"data":    user,
	})
}

func AddRoleToUser(c *fiber.Ctx) error {
	id := c.Params("id")
	roleName := c.Params("roleName")

	db := database.DB
	var user model.User
	var role model.Role
	db.First(&user, "id = ?", id)
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found with ID",
			"data":    nil,
		})
	}
	db.First(&role, "name = ?", roleName)
	if role.Name == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "Role not found with Name",
			"data":    nil,
		})
	}

	if err := db.Model(&user).Association("Roles").Append(&role); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Role not added to user",
			"data":    err,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Role added to user successfully",
		"data":    user,
	})
}

func DeleteUser(c *fiber.Ctx) error {
	type PasswordInput struct {
		Password string `json:"password"`
	}

	var pi PasswordInput
	if err := c.BodyParser(&pi); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"data":    err,
		})
	}

	id := c.Params("id")
	token := c.Locals("user").(*jwt.Token)

	if !validToken(token, id) {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid token id",
			"data":    nil,
		})
	}

	if !validRole(token, "admin") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Not valid role",
			"data":    nil,
		})
	}

	if !validUser(id, pi.Password) {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Not valid user",
			"data":    nil,
		})
	}

	db := database.DB
	var user model.User
	db.First(&user, "id = ?", id)
	db.Delete(&user)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User deleted successfully",
		"data":    nil,
	})
}
