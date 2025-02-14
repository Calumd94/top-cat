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


