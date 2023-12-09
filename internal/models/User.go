package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID        uuid.UUID `bun:"id,pk,type:uuid,default:uuid_generate_v4()"`
	Username  string    `bun:"username,unique"`
	Email     string    `bun:"email,unique"`
	Password  string    `bun:"password"`
	Avatar    string    `bun:"avatar"`
	Bio       string    `bun:"bio"`
	Website   string    `bun:"website"`
	Location  string    `bun:"location"`
	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
}
