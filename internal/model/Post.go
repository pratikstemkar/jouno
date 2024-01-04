package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Post struct {
	ID        uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Title     string    `json:"title" gorm:"not null"`
	Body      string    `json:"body" gorm:"not null"`
	Image     string    `json:"image"`
	UserID    uuid.UUID `json:"userID" gorm:"not null"`
	User      User
	Comments  []Comment
	DeletedAt gorm.DeletedAt `gorm:"index"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Comment struct {
	ID        uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Text      string    `json:"text" gorm:"not null"`
	UserID    uuid.UUID `json:"userID" gorm:"not null"`
	User      User
	PostID    uuid.UUID `json:"postID" gorm:"not null"`
	Post      Post
	DeletedAt gorm.DeletedAt `gorm:"index"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
