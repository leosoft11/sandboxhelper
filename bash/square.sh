#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1
square_appId=${2}
square_secret=${3}
square_sandboxAppID=${4}
square_sandboxAccessToken=${5}
square_webhookKey=${6}
square_webhookV2key=${7}







proxy=$(kubectl get pod -n "sandbox-$SANDBOX" -l app=proxy,hive=eu-fra1 -o jsonpath='{.items[].metadata.name}')


echo "update square_app set app_id = '${square_appId}', app_secret = '${square_secret}', sandbox_app_id = '${square_sandboxAppID}', sandbox_access_token = '${square_sandboxAccessToken}' , webhook_key = '${square_webhookKey}' , webhook_v2_key = '${square_webhookV2key}' where type = 'CURRENT';" | psql-sand "${SANDBOX}" proxy

kubectl -n "sandbox-$SANDBOX" exec -it $proxy -c "proxy" kill 1
exit
