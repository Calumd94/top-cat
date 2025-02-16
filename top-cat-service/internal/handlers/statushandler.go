package handlers

import (
	"log"
	"net/http"
)

// Status handler
func StatusHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("TopCat back-end is up and running!"))
	log.Printf("StatusHandler: TopCat back-end is up and running!")
}
