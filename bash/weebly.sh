#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1
clientId=$2
secretKey=$3
version=$4



WEEBLY=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=weebly,hive=eu-fra1" -o jsonpath='{.items[].metadata.name}')
APPMARKET=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=appmarket,hive=eu-fra1" -o jsonpath='{.items[].metadata.name}')




# echo "insert into properties values (0,'clover-hosted-iframe-enabled.stores','all');" | psql-sand "${SANDBOX}" proxy

kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" -- bash -c "sed -i  's/\(^weebly.clientId = \).*/\1${clientId}/' /opt/service-conf/weebly.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" -- bash -c "sed -i  's/\(^weebly.secretKey = \).*/\1${secretKey}/' /opt/service-conf/weebly.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" -- bash -c "sed -i  's/\(^weebly.version = \).*/\1${version}/' /opt/service-conf/weebly.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" -- bash -c "sed -i  's/\(^weebly.ecwid_api.client = \).*/\1${clientId}/' /opt/service-conf/weebly.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" -- bash -c "sed -i  's/\(^weebly.ecwid_api.secret = \).*/\1thisisthelongclientsecret/' /opt/service-conf/weebly.properties"

echo "update application set clientid = '${clientId}' where namespace = 'ecwid-weebly-app';" | psql-sand "${SANDBOX}" appmarket


kubectl -n "sandbox-$SANDBOX" exec -it $WEEBLY -c "weebly" kill 1
kubectl -n "sandbox-$SANDBOX" exec -it $APPMARKET -c "appmarket" kill 1
exit
