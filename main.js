const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 500,
        transparent: true,      // Allows semi-transparent UI
        frame: false,            // Removes title bar
        resizable: false,
        alwaysOnTop: true,       // Keeps it above other apps
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('renderer/index.html');
    
    // Optional: Auto-hide menu bar
    win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

// Close app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// IPC communication to close the app from the UI
ipcMain.on('close-app', () => {
    app.quit();
});