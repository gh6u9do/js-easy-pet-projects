const electron = require('electron');
let mainWindow = null;
const app = electron.app;
app.on('ready', () => {

    mainWindow = new electron.BrowserWindow({
        show: false,
        kiosk: false,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    // mainWindow.removeMenu();

    mainWindow.webContents.loadFile('./app/index.html');
    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        // mainWindow.removeMenu();
        mainWindow.show();
    })
    mainWindow.on('closed', () => {
        mainWindow = null;
    })

})