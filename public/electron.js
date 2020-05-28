"use strict";
exports.__esModule = true;
// public/electron.ts
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
// 1. Garbage Collection 이 일어나지 않도록 함수 밖에 선언함.
var mainWindow;
function createWindow() {
    var dockMenu = electron_1.Menu.buildFromTemplate([]);
    electron_1.app.dock.setMenu(dockMenu);
    var mainWindow = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        fullscreen: false,
        fullscreenable: false,
        show: false,
        backgroundColor: '#282c34'
    });
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', function () {
        mainWindow.show();
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
