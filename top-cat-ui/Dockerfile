# Use a Node.js image to build the React app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the entire project into the container
COPY . .

COPY .env.prod .env

# Build the React app
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy the built React app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy any necessary configuration files (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set environment variable to production
ENV ENV=prod

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]