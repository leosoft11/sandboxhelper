#/bin/sh

#bash vend.sh 86530v1 node 3 vend {Client_ID} {Client_Secret}
  
SANDBOX=$1
APP=$2
HIVE=${3:-1}

reg=""



POD=$(kubectl get pod -n "sandbox-$SANDBOX" -l "app=$APP,hive=eu-fra$HIVE" -o jsonpath='{.items[].metadata.name}')

kubectl -n "sandbox-$SANDBOX" exec -it $POD -c "${APP}" -- bash -c "sed -i 's/#clover.secretKeys = dunnon/clover.secretKeys = dunnon/g' /opt/service-conf/'${APP}'.properties"
kubectl -n "sandbox-$SANDBOX" exec -it $POD -c "${APP}" -- bash -c "sed -i 's/#clover.httpEndpoints = direct(https://clovertestingscript-clover.ecwid.qa/wsnext)/clover.httpEndpoints = direct(https://keks-clover.ecwid.qa/wsnext)/g' /opt/service-conf/'${APP}'.properties"


