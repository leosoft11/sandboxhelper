const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    let win = new BrowserWindow({
        width: 940,
        height: 470,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    win.loadFile('index.html');
}


app.on('ready', createWindow);