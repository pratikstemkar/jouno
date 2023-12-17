package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

func Config(key string) string {
	// err := godotenv.Load(".env")
	// if err != nil {
	// 	fmt.Print("Error loading .env file")
	// }
	return os.Getenv(key)
}
