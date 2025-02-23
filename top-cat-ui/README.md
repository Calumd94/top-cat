# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

**Make sure you are in the UI project directory**
### `cd top-cat-ui`

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---
<br><br>

## Running Docker PROD
1. Navigate to the Dockerfile location
```bash
cd top-cat-ui
```
2. Build the docker image
```bash
docker build --no-cache -t top-cat-ui .
```
3. Run the container
```bash
docker run -p 3009:80 top-cat-ui
```
```bash
docker run -p 3009:80 calumd94/top-cat-ui:latest
```
4. Test if the server is running
```
http://localhost:3009
```

---
<br><br>

## Running Kubernetes PROD
Make sure you push the local docker image to the repository
1. Tag the image
```bash
docker tag my-image:latest my-registry/my-image:latest
docker tag top-cat-ui:latest calumd94/top-cat-ui:latest
```
2. Push the image
```bash
docker push my-registry/my-image:latest
docker push calumd94/top-cat-ui:latest
```
3. When rebuilding and pushing:
```bash
docker build -t calumd94/top-cat-ui:latest .
```

---

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
cd top-cat-ui/kubernetes
kubectl apply -f '*.yaml' #Apply the configuration for all files that end with '.yaml'
```
```bash
cd top-cat-ui/kubernetes
kubectl apply -f './deployment.yaml' -n top-cat #Apply the configuration for this file
```
```bash
kubectl delete pod top-cat-ui-deployment-756f69fb94-5mcbx -n default #Delete this pod from this namespace
```
```bash
kubectl get deployments -n default #find deployemnts in default
```
```bash
kubectl delete deployment <deployment-name> -n default #Remove this deployment from this namespace
kubectl delete deployment top-cat-ui-deployment -n top-cat
```
```bash
kubectl rollout restart deployment top-cat-ui-deployment -n top-cat #Restart deployment
```

---
<br><br>
