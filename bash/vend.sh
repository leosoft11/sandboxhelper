#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1

Vend_clientID=$2
Vend_SercetKey=$3


POD2=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra2" -o jsonpath='{.items[].metadata.name}')
POD3=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=node,hive=eu-fra3" -o jsonpath='{.items[].metadata.name}')

VEND=$(kubectl get pod -n "sandbox-$SANDBOX" -l app=vend,hive=eu-fra1 -o jsonpath='{.items[].metadata.name}')


# kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "vend.serviceUrl = '${SANDBOX}'-vend.ecwid.qa" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "vend.redisEndpoints = direct(redis-wsnext-1.sandbox-'${SANDBOX}'.svc.cluster.local:6379:sandbox-'${SANDBOX}'-redis-wsnext-1 redis-wsnext-2.sandbox-'${SANDBOX}'.svc.cluster.local:6379:sandbox-'${SANDBOX}'-redis-wsnext-2)" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "vend.httpEndpoints = direct(https://'${SANDBOX}'-vend.ecwid.qa/wsnext)" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "vend.secretKeys = 123456" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c 'echo "vend.clientId = '${Vend_clientID}'" >> /opt/service-conf/node.properties'

# kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "vend.serviceUrl = '${SANDBOX}'-vend.ecwid.qa" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "vend.redisEndpoints = direct(redis-wsnext-1.sandbox-'${SANDBOX}'.svc.cluster.local:6379:sandbox-'${SANDBOX}'-redis-wsnext-1 redis-wsnext-2.sandbox-'${SANDBOX}'.svc.cluster.local:6379:sandbox-'${SANDBOX}'-redis-wsnext-2)" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "vend.httpEndpoints = direct(https://'${SANDBOX}'-vend.ecwid.qa/wsnext)" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "vend.secretKeys = 123456" >> /opt/service-conf/node.properties'
# kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c 'echo "vend.clientId = '${Vend_clientID}'" >> /opt/service-conf/node.properties'

kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" -- bash -c "sed -i  's/\(^vend.clientId = \).*/\1${Vend_clientID}/' /opt/service-conf/node.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" -- bash -c "sed -i  's/\(^vend.clientId = \).*/\1${Vend_clientID}/' /opt/service-conf/node.properties"



kubectl -n "sandbox-$SANDBOX" exec -it $VEND -c "vend" -- bash -c "sed -i  's/\(^vend.clientId = \).*/\1${Vend_clientID}/' /opt/service-conf/vend.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $VEND -c "vend" -- bash -c "sed -i  's/\(^vend.clientSecret = \).*/\1${Vend_SercetKey}/' /opt/service-conf/vend.properties"

echo "update application set clientid = '${Vend_clientID}',clientsecret = '${Vend_SercetKey}' where namespace = 'ecwid-vend';" | psql-sand "${SANDBOX}" appmarket

kubectl -n "sandbox-$SANDBOX" exec -it $POD2 -c "node" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $POD3 -c "node" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $VEND -c "vend" kill 1
exit