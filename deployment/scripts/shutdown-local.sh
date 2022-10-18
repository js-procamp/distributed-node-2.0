#!/bin/bash
helm delete my-mongo
helm delete my-redis
kubectl delete -f ../01-user-service.yaml
kubectl delete -f ../02-chat-service.yaml
kubectl delete -f ../03-chat-app.yaml