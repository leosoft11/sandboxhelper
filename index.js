document.addEventListener('DOMContentLoaded', () => {
    const linksTab = document.querySelectorAll('.link_text'),
           blockTab = document.querySelectorAll('.block'),
           childProcess = require('child_process'),
           sandbox_name = document.querySelector('.sandbox_name'),
           sandbox_name_imex = document.querySelector('.sandbox_name--imex'),
           sandbox_name_weebly = document.querySelector('.sandbox_name--weebly'),
           sandbox_name_vend = document.querySelector('.sandbox_name--vend'),
           sandbox_name_square = document.querySelector('.sandbox_name--square');

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


    cloverSettingsBtn.disabled = true;
    cloverSettingsBtn.classList.add('btn_disabled');

    cloverGetKey.addEventListener('click', () => {
        if (sandbox_name.value) {
            try {
                let clover_getKey = childProcess.execSync(`bash bash/cloverKey.sh ${sandbox_name.value}`).toString();
                alert(`Результат выполнения скрипта: ${clover_getKey}`);
                cloverSettingsBtn.disabled = false;
                cloverSettingsBtn.classList.remove('btn_disabled');
            } catch(e){
                alert(`Видимо что-то пошло не так ${e}`);
            }
         
        } else {
            alert('Введите название сэндбокса');
        }
    });      

    cloverSettingsBtn.addEventListener('click', () => {
       if (sandbox_name.value && cloverKey.value && cloverSetApp.value) {
           try {
            let comand1_clover = childProcess.execSync(`bash bash/clover.sh ${sandbox_name.value} ${cloverKey.value} ${cloverSetApp.value}`).toString();
                alert(`Результат выполнения скрипта: ${comand1_clover}`);
           } catch(e) {
                alert(`Видимо что-то пошло не так ${e}`);
           }
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
            try{
                let comand_vend = childProcess.execSync(`bash bash/vend.sh ${sandbox_name_vend.value} ${vendClientId.value} ${vend_clientSecret.value}`).toString();
                alert(`Результат выполнения скрипта: ${comand_vend}`);
            } catch(e) {
                alert(`Видимо что-то пошло не так ${e}`);
            }
        } else {
            alert('Необходимо заполнить все поля')
        }
    });


    // Weebly //

    const btn_weebly = document.querySelector('.btn_weebly'),
          weeblyClientId = document.querySelector('.weebly_clientId'),
          weeblyClientSecret = document.querySelector('.weebly_secretKey'),
          weeblyAppId = document.querySelector('.weeblyAppID');

    btn_weebly.addEventListener('click', () => {
        if(sandbox_name_weebly.value && weeblyClientId.value && weeblyClientSecret.value && weeblyAppId.value) {
            try{
                let comand_weebly = childProcess.execSync(`bash bash/weebly.sh ${sandbox_name_weebly.value} ${weeblyClientId.value} ${weeblyClientSecret.value} ${weeblyAppId.value}`).toString();
                alert(`Результат выполнения скрипта: ${comand_weebly}`);
            } catch(e) {
                alert(`Видимо что-то пошло не так ${e}`);
            }
        } else {
            alert('Необходимо заполнить все поля')
        }
    });


    // imex //

    const btn_imex = document.querySelector('.btn_imex');

    btn_imex.addEventListener('click', () => {
        if (sandbox_name_imex.value) {
            try{
                let comand_imex = childProcess.execSync(`bash bash/imex.sh ${sandbox_name_imex.value}`).toString();
                alert(`Результат выполнения скрипта: ${comand_imex}`);
            } catch(e) {
                alert(`Видимо что-то пошло не так ${e}`);
            }
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
            try{
                let comand_square = childProcess.execSync(`bash bash/square.sh ${sandbox_name_square.value} ${square_appId.value} ${square_secret.value} ${square_sandboxAppID.value} ${square_sandboxAccessToken.value} ${square_webhookKey.value} ${square_webhookV2key.value}`).toString();
                alert(`Результат выполнения скрипта: ${comand_square}`);
            } catch(e) {
                alert(`Видимо что-то пошло не так ${e}`);
            }
        } else{
            alert('Необходимо заполнить все поля')
        }
    });
});
