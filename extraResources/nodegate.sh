#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1

node2=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra2" -o jsonpath='{.items[].metadata.name}')
node3=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra3" -o jsonpath='{.items[].metadata.name}')



kubectl -n "sandbox-$SANDBOX" exec -it $node2 -c "node" -- bash -c "tail -f /opt/node/logs/*.log"
kubectl -n "sandbox-$SANDBOX" exec -it $node3 -c "node" -- bash -c "tail -f /opt/node/logs/*.log"


# echo "${key}"
# exit