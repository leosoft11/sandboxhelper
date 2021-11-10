#/bin/sh

#bash editprop.sh 86530v1 node 3 1
  
SANDBOX=$1
Prop1="imex.grpc.host=${SANDBOX}-imex-grpc.ecwid.qa"
Prop2="imex.grpc.port=443"



POD2=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra2" -o jsonpath='{.items[].metadata.name}')
POD3=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra3" -o jsonpath='{.items[].metadata.name}')

kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo '${Prop1}' >> /opt/service-conf/node.properties'
kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo '${Prop2}' >> /opt/service-conf/node.properties'

kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo '${Prop1}' >> /opt/service-conf/node.properties'
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo '${Prop2}' >> /opt/service-conf/node.properties'

kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" kill 1
exit