package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uuid.UUID      `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Username  string         `json:"username" gorm:"unique;not null"`
	Email     string         `json:"email" gorm:"unique;not null"`
	Password  string         `json:"password"`
	Name      string         `json:"name"`
	Pronouns  string         `json:"pronouns"`
	Banner    string         `json:"banner"`
	Avatar    string         `json:"avatar"`
	Gender    string         `json:"gender"`
	Bio       string         `json:"bio"`
	Website   string         `json:"website"`
	Location  string         `json:"location"`
	Verified  bool           `json:"verified"`
	Roles     []Role         `gorm:"many2many:user_roles;"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Role struct {
	ID          uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name        string    `json:"name" gorm:"unique;not null"`
	Description string    `json:"description"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
