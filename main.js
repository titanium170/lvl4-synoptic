"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var startup_1 = require("./dist/startup");
function createWindow() {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        frame: false
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, './dist/index.html'));
    // mainWindow.loadURL('http://localhost:4200/');
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', function () {
    console.log('ready');
    createWindow();
    startup_1.startup();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
