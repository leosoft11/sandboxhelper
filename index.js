// To do list //
// Думаю стоит переписать на такую конструкцию: //
// const { exec } = require('child_process');
// exec('kubectl -n sandbox-price2 get pod',(error, stdout, stderr) => {
//     console.log(stdout.length);
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//   const int = setInterval(() => {
//         if (!stdout.length) {
//             alert('Пока еще нету данных');
//        } else {
//         console.log(`stdout: ${stdout}`);
//              clearInterval(int);  
//        }
//     },500);
document.addEventListener('DOMContentLoaded', () => {
    const linksTab = document.querySelectorAll('.link_text'),
           blockTab = document.querySelectorAll('.block'),
           sandbox_name = document.querySelector('.sandbox_name'),
           sandbox_name_imex = document.querySelector('.sandbox_name--imex'),
           sandbox_name_weebly = document.querySelector('.sandbox_name--weebly'),
           sandbox_name_vend = document.querySelector('.sandbox_name--vend'),
           sandbox_name_square = document.querySelector('.sandbox_name--square'),
           loader = document.querySelector('.loader');

    linksTab.forEach(item => {
        item.addEventListener('click', (e) => {
            const tabsPath = e.target.dataset.tabsPath;
            console.log(tabsPath);
            tabsHandler(tabsPath);
        })
    })

    const tabsHandler = (path) => {
        linksTab.forEach(item => {item.classList.remove('active');});
        document.querySelector(`[data-tabs-path="${path}"]`).classList.add('active');

        blockTab.forEach(item => {item.classList.remove('block_active');});
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('block_active');
    }

    // Clover // 
    const cloverSettingsBtn = document.querySelector('.btn_clover'),
          cloverGetKey = document.querySelector('.btn_getKey'),
          cloverSetApp = document.querySelector('.clover_select'),
          cloverKey = document.querySelector('.clover_key');

    cloverGetKey.addEventListener('click', () => {
        if (sandbox_name.value) {
            // try {
            //     let clover_getKey = childProcess.execSync(`bash bash/cloverKey.sh ${sandbox_name.value}`).toString();
            //     alert(`Результат выполнения скрипта: ${clover_getKey}`);
            // } catch(e){
            //     alert(`Видимо что-то пошло не так ${e}`);
            // }
            loader.classList.remove('block');
            const { exec } = require('child_process');
            exec(`bash bash/cloverKey.sh ${sandbox_name.value}`,(error, stdout, stderr) => {
                if (error) {
                    loader.classList.add('block');
                    alert(`exec error: ${error}`);
                    return;
                }
                loader.classList.add('block');
                if (stdout.length == 1) {
                    alert(`Не нашлось ничего`);
                } else {
                    // Тут собираем массив ключей(если их будет много)
                    let Key  = stdout.replace(/\s+/g, '').split(',').reverse().slice(1).reverse();

                    // Получаем последний найденный ключ 
                    let lastEl = Key.slice(-1)[0];

                    cloverKey.value = lastEl;

                    cloverKey.select();
                    document.execCommand("copy");
            
                    alert(`Ваш Ключ: ${lastEl} Сохранен в буфер обмена`);
                }
            });
         
        } else {
            alert('Введите название сэндбокса');
        }
    });      

    cloverSettingsBtn.addEventListener('click', () => {
       if (sandbox_name.value && cloverKey.value && cloverSetApp.value) {
        //    try {
        //     let comand1_clover = childProcess.execSync(`bash bash/clover.sh ${sandbox_name.value} ${cloverKey.value} ${cloverSetApp.value}`).toString();
        //         alert(`Результат выполнения скрипта: ${comand1_clover}`);
        //    } catch(e) {
        //         alert(`Видимо что-то пошло не так ${e}`);
        //    }
        loader.classList.remove('block');
        const { exec } = require('child_process');
        exec(`bash bash/clover.sh ${sandbox_name.value} ${cloverKey.value} ${cloverSetApp.value}`,(error, stdout, stderr) => {
            if (error) {
                loader.classList.add('block');
                alert(`exec error: ${error}`);
                return;
            }
            loader.classList.add('block');
            alert(`Ошибок не было, значит сэндбоксы почти настроены, осталось подождать запуска контейнеров на площадке ${stdout}`);
        });
       } else {
           alert("Необходимо заполнить все поля");
       }
    });
    

    // Vend //

    const btn_vend = document.querySelector('.btn_vend'),
          vendClientId = document.querySelector('.vend_clientId'),
          vend_clientSecret = document.querySelector('.vend_clientSecret');

    btn_vend.addEventListener('click', () => {
        if (sandbox_name_vend.value && vendClientId.value && vend_clientSecret.value) {

            // try{
            //     let comand_vend = childProcess.execSync(`bash bash/vend.sh ${sandbox_name_vend.value} ${vendClientId.value} ${vend_clientSecret.value}`).toString();
            //     alert(`Результат выполнения скрипта: ${comand_vend}`);
            // } catch(e) {
            //     alert(`Видимо что-то пошло не так ${e}`);
            // }
            loader.classList.remove('block');
            const { exec } = require('child_process');
            exec(`bash bash/vend.sh ${sandbox_name_vend.value} ${vendClientId.value} ${vend_clientSecret.value}`,(error, stdout, stderr) => {
                if (error) {
                    loader.classList.add('block');
                    alert(`exec error: ${error}`);
                    return;
                }
                loader.classList.add('block');
                alert(`Ошибок не было, значит сэндбоксы почти настроены, осталось подождать запуска контейнеров на площадке ${stdout}`);
            });
        } else {
            alert('Необходимо заполнить все поля')
        }
    });


    // Weebly //

    const btn_weebly = document.querySelector('.btn_weebly'),
          weeblyClientId = document.querySelector('.weebly_clientId'),
          weeblyClientSecret = document.querySelector('.weebly_secretKey'),
          weeblyAppId = document.querySelector('.weeblyAppID'),
          btn_weebly_app = document.querySelector('.btn_weebly_app');

    btn_weebly.addEventListener('click', () => {
        if(sandbox_name_weebly.value && weeblyClientId.value && weeblyClientSecret.value && weeblyAppId.value) {
            // try{
            //     let comand_weebly = childProcess.execSync(`bash bash/weebly.sh ${sandbox_name_weebly.value} ${weeblyClientId.value} ${weeblyClientSecret.value} ${weeblyAppId.value}`).toString();
            //     alert(`Результат выполнения скрипта: ${comand_weebly}`);
            // } catch(e) {
            //     alert(`Видимо что-то пошло не так ${e}`);
            // }
            loader.classList.remove('block');
            const { exec } = require('child_process');
            exec(`bash bash/vend.sh ${sandbox_name_vend.value} ${vendClientId.value} ${vend_clientSecret.value}`,(error, stdout, stderr) => {
                if (error) {
                    loader.classList.add('block');
                    alert(`exec error: ${error}`);
                    return;
                }
                loader.classList.add('block');
                alert(`Ошибок не было, значит сэндбоксы почти настроены, осталось подождать запуска контейнеров на площадке ${stdout}`);
            });
        } else {
            alert('Необходимо заполнить все поля')
        }
    });

    btn_weebly_app.addEventListener('click',() => {
        weeblyAppId.value = '1.0.10';
        const shell = require('electron').shell;
        shell.openExternal("https://lamps.ecwid.com/~lukarek/php/");
    });

    // imex //

    const btn_imex = document.querySelector('.btn_imex');

    btn_imex.addEventListener('click', () => {
        if (sandbox_name_imex.value) {
            // try{
            //     let comand_imex = childProcess.execSync(`bash bash/imex.sh ${sandbox_name_imex.value}`).toString();
            //     alert(`Результат выполнения скрипта: ${comand_imex}`);
            // } catch(e) {
            //     alert(`Видимо что-то пошло не так ${e}`);
            // }
            loader.classList.remove('block');
            const { exec } = require('child_process');
            exec(`bash bash/imex.sh ${sandbox_name_imex.value}`,(error, stdout, stderr) => {
                if (error) {
                    loader.classList.add('block');
                    alert(`exec error: ${error}`);
                    return;
                }
                loader.classList.add('block');
                alert(`Ошибок не было, значит сэндбоксы почти настроены, осталось подождать запуска контейнеров на площадке ${stdout}`);
            });
            
        } else {
            alert('Необходимо заполнить все поля')
        }
    });


    // square //

    const btn_square = document.querySelector('.btn_square'),
          square_appId = document.querySelector('.square_appId'),
          square_secret = document.querySelector('.square_secret'),
          square_sandboxAppID = document.querySelector('.square_sandboxAppID'),
          square_sandboxAccessToken = document.querySelector('.square_sandboxAccessToken'),
          square_webhookKey = document.querySelector('.square_webhookKey'),
          square_webhookV2key = document.querySelector('.square_webhookV2key');

    btn_square.addEventListener('click', () => {
        if (sandbox_name_square.value && square_appId.value && square_secret.value && square_sandboxAppID.value && square_sandboxAccessToken.value && square_webhookKey.value && square_webhookV2key.value) {
            // try{
            //     let comand_square = childProcess.execSync(`bash bash/square.sh ${sandbox_name_square.value} ${square_appId.value} ${square_secret.value} ${square_sandboxAppID.value} ${square_sandboxAccessToken.value} ${square_webhookKey.value} ${square_webhookV2key.value}`).toString();
            //     alert(`Результат выполнения скрипта: ${comand_square}`);
            // } catch(e) {
            //     alert(`Видимо что-то пошло не так ${e}`);
            // }
            loader.classList.remove('block');
            const { exec } = require('child_process');
            exec(`bash bash/square.sh ${sandbox_name_square.value} ${square_appId.value} ${square_secret.value} ${square_sandboxAppID.value} ${square_sandboxAccessToken.value} ${square_webhookKey.value} ${square_webhookV2key.value}`,(error, stdout, stderr) => {
                if (error) {
                    loader.classList.add('block');
                    alert(`exec error: ${error}`);
                    return;
                }
                loader.classList.add('block');
                alert(`Ошибок не было, значит сэндбоксы почти настроены, осталось подождать запуска контейнеров на площадке ${stdout}`);
            });
        } else{
            alert('Необходимо заполнить все поля')
        }
    });
});
