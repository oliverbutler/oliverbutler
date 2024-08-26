package main

import (
	"net/http"
	"oliverbutler/templates"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fileServer := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		templates.Index().Render(r.Context(), w)
	})

	r.Get("/maps", func(w http.ResponseWriter, r *http.Request) {
		templates.Map("Place fell").Render(r.Context(), w)
	})

	http.ListenAndServe("localhost:3000", r)
}
