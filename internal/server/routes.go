package server

func (s *FiberServer) RegisterFiberRoutes() {
	api := s.App.Group("/api")
	v1 := api.Group("/v1")
	v1.Get("/", s.HelloWorldHandler)
	v1.Get("/health", s.healthHandler)
}
