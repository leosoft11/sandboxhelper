#/bin/sh

brew install node

npm i

App_name="RunStart.command"

touch ${App_name}

chmod +x ${App_name}

path=$(pwd)

echo "cd ${path}" >> ${App_name}
echo "npm run start" >> ${App_name}

echo "Все настройки завершены, теперь для запуска приложения достаточно кликнуть на файл ${App_name}"

