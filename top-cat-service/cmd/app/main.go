package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/Calumd94/top-cat/internal/handlers"
	"github.com/joho/godotenv"
)

func main() {
	// Detect environment (default: "development")
	env := os.Getenv("ENV")
	if env == "" {
		env = "dev" // Default to development mode
	}

	// Determine the correct .env file to load
	envFile := ""
	if env == "dev" {
		envFile = "../../.env." + env
	} else {
		envFile = "/root/.env." + env
	}

	// Load environment variables
	if err := godotenv.Load(envFile); err != nil {
		log.Printf("Warning: No %s file found, using system environment variables", envFile)
	}

	// Grab the API key from the environment variables
	apiKey := os.Getenv("WATCHMODE_API_KEY")
	if apiKey == "" {
		log.Fatal("API Key is not set. Ensure WATCHMODE_API_KEY is in your environment variables.")
	}

	// Define routes
	http.HandleFunc("/api/status", handlers.StatusHandler)
	http.HandleFunc("/api/titles/", handlers.FindTitleHandler(apiKey))
	http.HandleFunc("/api/sources/", handlers.FindSourcesHandler(apiKey))

	// Configure CORS middleware
	corsHandler := corsMiddleware(http.DefaultServeMux)

	// Start the server
	// If you cannot connect to the API (502 error) you may want to check the IP-address of the kubernetes node - it is not static and so may be different to that in the .env.prod file
	ip := os.Getenv("IP_ADDRESS")
	if ip == "" {
		ip = "localhost" // Default ip-address
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port
	}
	server := &http.Server{
		Addr:         "0.0.0.0:" + port, // Supports both IPv4 & IPv6
		Handler:      corsHandler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Printf("Server started on http://%s:%s\n", ip, port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}

// CORS Middleware
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}
