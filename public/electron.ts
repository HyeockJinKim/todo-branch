// public/electron.ts
import { app, Menu, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

// 1. Garbage Collection 이 일어나지 않도록 함수 밖에 선언함.
let mainWindow: BrowserWindow;

function createWindow() {
  if (process.platform === "darwin") {
    const dockMenu = Menu.buildFromTemplate([]);
    app.dock.setMenu(dockMenu);
  }

  let mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    fullscreen: false,
    fullscreenable: false,
    show: false,
    backgroundColor: '#282c34',
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null!;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
