# Local k8s deployment using Minikube

## First of all, start the Minikube locally

```bash
minikube config set vm-driver kvm2
minikube status
minikube start --kubernetes-version v1.14.7 --cpus 4 --memory 8000 --vm-driver=kvm2
minikube tunnel
```

Note: I would suggest to do it in a separate terminal, cause process after the last command should not be stopped until k8s in use

## The next step is to run k8s services

Go to deployment > scripts and run deploy-local.sh script, but before that be sure to add permissions to sh scripts:

```bash
chmod +x deploy-local.sh
chmod +x shutdown-local.sh
```

```bash
./deploy-local.sh
```

## The next step is to check, if k8s services running and get IPs

```bash
 kubectl get svc --all-namespaces
```

Possible output:

```html
NAMESPACE     NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
default       chat-service        ClusterIP   10.103.164.243   <none>        3001/TCP                 54s
default       client-app          ClusterIP   10.97.57.77      <none>        80/TCP                   53s
default       kubernetes          ClusterIP   10.96.0.1        <none>        443/TCP                  72m
default       my-mongo-mongodb    ClusterIP   10.97.255.74     <none>        27017/TCP                57s
default       my-redis-headless   ClusterIP   None             <none>        6379/TCP                 54s
default       my-redis-master     ClusterIP   10.106.121.163   <none>        6379/TCP                 54s
default       my-redis-slave      ClusterIP   10.101.70.69     <none>        6379/TCP                 54s
```

## To shutdown k8s pods

```bash
./shutdown-local.sh
```
