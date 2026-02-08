// preload.js
// This file runs in a special context:
// - It has access to Electron + Node APIs
// - It can safely expose a small API to the renderer (the web page)

const { contextBridge, ipcRenderer } = require("electron");

// Expose a very small "api" object to window.api in the renderer
// The renderer cannot access ipcRenderer directly (good for security)
contextBridge.exposeInMainWorld("api", {
  // openTextFile() asks the main process to run the "open-text-file" handler
  openTextFile: () => ipcRenderer.invoke("open-text-file")
});
