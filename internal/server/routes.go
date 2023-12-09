package server

import "github.com/gofiber/fiber/v2/middleware/logger"

func (s *FiberServer) RegisterFiberRoutes() {
	api := s.App.Group("/api", logger.New())
	v1 := api.Group("/v1")
	v1.Get("/", s.HelloWorldHandler)
	v1.Get("/health", s.healthHandler)
}
