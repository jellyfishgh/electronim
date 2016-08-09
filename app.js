const path = require('path');

const {
    app,
    Tray,
    BrowserWindow
} = require('electron');

let win;
let tray;

/**
 * create window function
 */
function createWindow() {
    tray = new Tray(path.join(__dirname, 'path/icon.png'));
    tray.setTitle('electronim');
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
