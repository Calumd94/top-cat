package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Find sources handler
func FindSourcesHandler(apiKey string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Extract the movie/show ID from the URL path
		movieShowID := r.URL.Path[len("/api/sources/"):]
		if movieShowID == "" {
			http.Error(w, "Movie/Show ID is required", http.StatusBadRequest)
			return
		}

		url := fmt.Sprintf("https://api.watchmode.com/v1/title/%s/details/?apiKey=%s&append_to_response=sources", movieShowID, apiKey)

		// Make the HTTP request
		resp, err := http.Get(url)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error making request: %v", err), http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		// Read and parse the response
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error reading response: %v", err), http.StatusInternalServerError)
			return
		}

		var data interface{}
		if err := json.Unmarshal(body, &data); err != nil {
			http.Error(w, fmt.Sprintf("Error parsing JSON: %v", err), http.StatusInternalServerError)
			return
		}

		// Return the response as JSON
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(data)
	}
}
