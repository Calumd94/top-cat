### **Docker**
1. Build the docker image
```bash
docker build --no-cache -t top-cat-service .
```
2. Run the container
```bash
docker run -p 8080:8080 top-cat-service
```
3. Test if the server is running by command
```bash
curl http://localhost:8080/api/status
```


### **Initializing and installing dependencies**
1. Initialize a Go Module
```bash
go mod init <module-name>
go mod init main.go #example
```
2. Get a dependency
>Get resolves its command-line arguments to packages at specific module versions,
>updates go.mod to require those versions, and downloads source code into the
>module cache.
```bash
go get example.com/cmd@latest
go get github.com/joho/godotenv #example
```
3. Install a dependency
```bash
go install example.com/cmd@latest
go install github.com/joho/godotenv #example
```


