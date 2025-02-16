package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
)

// Find title handler
func FindTitleHandler(apiKey string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Extract the title search string from the URL path
		titleSearchString := r.URL.Path[len("/api/titles/"):]
		if titleSearchString == "" {
			http.Error(w, "Title search string is required", http.StatusBadRequest)
			return
		}

		encodedSearchString := url.QueryEscape(titleSearchString)
		log.Printf("FindTitleHandler: Search for title {%s}", encodedSearchString)
		url := fmt.Sprintf("https://api.watchmode.com/v1/autocomplete-search/?apiKey=%s&search_value=%s&search_type=2", apiKey, encodedSearchString)

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
		log.Printf("FindTitleHandler: Data returned for title {%s}", encodedSearchString)
	}
}
