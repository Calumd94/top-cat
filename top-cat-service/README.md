## Running Locally
1. Navigate to main.go file
```bash
cd top-cat-service/cmd/app
```
2. Run this command to start the app locally using the correct env variables
```bash
ENV=dev go run main.go
```

---
<br><br>


## Running Docker PROD
1. Navigate to the Dockerfile location
```bash
cd top-cat-service
```
2. Build the docker image
```bash
docker build --no-cache -t top-cat-service .
```
3. Run the container
```bash
docker run -p 8089:8089 top-cat-service
```
4. Test if the server is running by command
```bash
curl http://localhost:8089/api/status
```
5. ~~Navigate to the URL and test~~ < This no longer works due to the CloudFlare mapping having been updated to use the kubernetes node (minkube) ip address.
```
https://api.topcatapp.com/api/status
```

---
<br><br>

## Docker help
```bash
docker images #See all docker images in the registry
```

---
<br><br>


## Running Minikube after Server restart
1. Check the status
```bash
minikube status
```
2. Start minikube if its down
```bash
minikube start
```

---

## Running Kubernetes PROD
Make sure you push the local docker image to the repository
1. Tag the image
```bash
docker tag my-image:latest my-registry/my-image:latest
docker tag top-cat-service:latest calumd94/top-cat-service:latest
```
2. Push the image
```bash
docker push my-registry/my-image:latest
docker push calumd94/top-cat-service:latest
```
3. When rebuilding and pushing:
```bash
docker build -t calumd94/top-cat-service:latest .
```

---
<br><br>


## Kubernetes help
- https://kubernetes.io/docs/reference/kubectl/quick-reference/#kubectl-context-and-configuration
- https://dev.to/prodevopsguytech/writing-kubernetes-manifests-from-beginner-to-advanced-31bg
- https://minikube.sigs.k8s.io/docs/tutorials/kubernetes_101/module1/
```bash
kubectl get nodes #List all nodes
```
```bash
kubectl config get-clusters #List all clusters
```
```bash
kubectl create namespace <name> #Create a namespace
```
```bash
kubectl get pods --all-namespaces #Get all pods for all namespaces
```
```bash
kubectl get pods -n top-cat #Get all pods for a specific namespace
```
```bash
cd top-cat-service/kubernetes
kubectl apply -f '*.yaml' #Apply the configuration for all files that end with '.yaml'
```
```bash
cd top-cat-service/kubernetes
kubectl apply -f './deployment.yaml' -n top-cat #Apply the configuration for this file
```
```bash
kubectl delete pod top-cat-service-deployment-756f69fb94-5mcbx -n default #Delete this pod from this namespace
```
```bash
kubectl get deployments -n default #find deployemnts in default
```
```bash
kubectl delete deployment <deployment-name> -n default #Remove this deployment from this namespace
kubectl delete deployment top-cat-service-deployment -n default
```
```bash
kubectl rollout restart deployment top-cat-service-deployment -n top-cat #Restart deployment
```

---
<br><br>


## GO: Initializing and installing dependencies
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

---

### **GO: delve**
delve is installed. It is the de facto debugging tool for Golang.
1. To run delve debugger
```bash
cd top-cat-service/cmd/app
```
2. From command line run:
```bash
dlv debug ./main.go
```

---
<br><br>

