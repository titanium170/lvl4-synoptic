const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");
const mm = require('music-metadata');
const util = require('util');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // win.loadURL('http://localhost:4200');

  win.webContents.openDevTools()
}



app.whenReady().then(
  () =>  {
    createWindow();
    
  });

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
