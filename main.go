package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	component := Hello("Olly")

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		component.Render(r.Context(), w)
	})

	http.ListenAndServe("localhost:3000", r)
}
