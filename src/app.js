const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });

  // win.loadFile('dist/index.html');
  win.loadURL('http://localhost:4200');

  win.webContents.openDevTools()
}



app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
