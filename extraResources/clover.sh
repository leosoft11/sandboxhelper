#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1
KEY=$2
CloverAPP=$3

POD2=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra2" -o jsonpath='{.items[].metadata.name}')
POD3=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra3" -o jsonpath='{.items[].metadata.name}')

CLOVER=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=clover,hive=eu-fra1" -o jsonpath='{.items[].metadata.name}')
PROXY=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=proxy,hive=eu-fra1" -o jsonpath='{.items[].metadata.name}')




kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "clover.secretKeys = dunnon" >> /opt/service-conf/node.properties'
kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "clover.httpEndpoints = direct(https://'${SANDBOX}'-clover.ecwid.qa/wsnext)" >> /opt/service-conf/node.properties'

kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "clover.secretKeys = dunnon" >> /opt/service-conf/node.properties'
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "clover.httpEndpoints = direct(https://'${SANDBOX}'-clover.ecwid.qa/wsnext)" >> /opt/service-conf/node.properties'

echo "update clover_app set webhook_auth_code='${KEY}' where market='${CloverAPP}';" | psql-sand "${SANDBOX}" clover
echo "insert into properties values (0,'clover-hosted-iframe-enabled.stores','all');" | psql-sand "${SANDBOX}" proxy

kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $PROXY -c "proxy" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $CLOVER -c "clover" kill 1
exit