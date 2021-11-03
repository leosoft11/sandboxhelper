#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1

CLOVER=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=clover,hive=eu-fra1" -o jsonpath='{.items[].metadata.name}')

kubectl -n "sandbox-$SANDBOX" exec -it $CLOVER -c "clover" -- bash -c "cat | grep 'Verification code:' /opt/clover/logs/*.log"
