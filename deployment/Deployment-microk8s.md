# Local k8s deployment using Microk8s

MicroK8s is a low-ops, minimal production Kubernetes.

MicroK8s is an open-source system for automating deployment, scaling, and management of containerised applications. It provides the functionality of core Kubernetes components, in a small footprint, scalable from a single node to a high-availability production cluster.

Developed with Canonical, so best compatibility and user experience with Ubuntu

More details: https://microk8s.io/docs 

## First, you need to install the service

Please follow instructions: https://microk8s.io/docs/getting-started

## The next step is to run k8s services

Go to deployment > scripts and run deploy-local-microk8s.sh script, but before that be sure to add permissions to sh scripts:

```bash
chmod +x deploy-local-microk8s.sh
chmod +x shutdown-local-microk8s.sh
```

```bash
./deploy-local-microk8s.sh
```

## The next step is to check, if k8s services running and get IPs

```bash
 microk8s kubectl get svc --all-namespaces
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
./shutdown-local-microk8s.sh
```
