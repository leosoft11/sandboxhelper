#/bin/sh

brew install node

npm i

App_name="RunStart.command"

touch ${App_name}

chmod +x ${App_name}

keks=$(pwd)

echo "cd ${keks}" >> ${App_name}
echo "npm run start" >> ${App_name}

echo "Done"

