// This runs in the Main process (Node.js environment)
// It creates the desktop window and can do "desktop" things like open dialogs and read files

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

// Create the main application window
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,

    webPreferences: {
      // Preload runs before the renderer code and is the safe bridge for IPC
      preload: path.join(__dirname, "preload.js"),

      // Security: keep the renderer isolated from Node
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the renderer UI (index.html) into the window
  win.loadFile("index.html");
}

// Wait until Electron is ready before creating windows
app.whenReady().then(() => {
  createWindow();

  // macOS: if the user clicks the dock icon and no window is open, reopen one
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// When all windows are closed:
// - On Windows/Linux: quit the app
// - On macOS: apps usually stay running until the user quits explicitly
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC handler: the renderer calls this when the user clicks "Open .txt file"
ipcMain.handle("open-text-file", async () => {
  // Open the native file picker dialog (this is a desktop feature)
  const result = await dialog.showOpenDialog({
    title: "Select a text file",
    properties: ["openFile"],
    filters: [{ name: "Text Files", extensions: ["txt"] }]
  });

  // If the user cancels or selects nothing, tell the renderer we canceled
  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  // Get the chosen file path
  const filePath = result.filePaths[0];

  // Read the file contents from disk using Node's fs module
  const content = fs.readFileSync(filePath, "utf-8");

  // Return data back to the renderer (it will display it)
  return { canceled: false, filePath, content };
});
