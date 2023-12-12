package database

import (
	"context"
	"fmt"
	"jouno/internal/config"
	"jouno/internal/model"
	"strconv"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() {
	var err error
	p := config.Config("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)

	if err != nil {
		panic("failed to parse database port")
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.Config("DB_HOST"), port, config.Config("DB_USERNAME"), config.Config("DB_PASSWORD"), config.Config("DB_DATABASE"))
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Printf("%s", err)
	}

	_, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	fmt.Println("Connection Opened to Database")
	DB.AutoMigrate(&model.User{}, model.Role{})
	fmt.Println("Database Migrated")
}
