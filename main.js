const { BrowserWindow, app, ipcMain } = require('electron');
const path = require('path');

ipcMain.on('msg',(e,data) => {
    console.log(data);
    e.reply('reply','hi whats up')
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        backgroundColor: "#fff",
        alwaysOnTop: false,
        resizable: true,
        title: "Electron App",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join("__dirname", 'preload.js')
        }
    })

    // let child = new BrowserWindow({
    //     parent: win
    // })

    // child.loadFile("child.html");
    // child.show();

    win.loadFile("index.html")
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    if(process.platform !== 'darwin')
        app.quit();
})