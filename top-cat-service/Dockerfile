# Use the official Go image as a builder
FROM golang:1.22.2 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy Go modules and dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go binary
RUN go build -o main ./cmd/app && ls -lah main

# Use a minimal image for the final container
FROM ubuntu:latest

# Set the working directory
WORKDIR /root/

# Copy the compiled Go binary from the builder
COPY --from=builder /app/main .

# Copy any necessary configuration files (if needed)
COPY .env.prod /root/.env.prod

# Set environment variable to production
ENV ENV=prod

# Expose the port the app runs on
EXPOSE 8089

# Run the Go application
CMD ["./main"]