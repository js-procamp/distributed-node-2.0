helm install my-mongo bitnami/mongodb
helm install my-redis --set cluster.slaveCount=0 bitnami/redis
kubectl apply -f ../02-chat-service.yaml
kubectl apply -f ../03-chat-app.yaml
kubectl apply -f ../01-user-service.yaml
