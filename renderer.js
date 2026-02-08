// renderer.js
// This runs in the Renderer process (Chromium)
// It handles the button click and updates the HTML page

const openBtn = document.getElementById("openBtn");
const filePathEl = document.getElementById("filePath");
const outputEl = document.getElementById("output");

// When the user clicks the button, ask the main process to open the file dialog
openBtn.addEventListener("click", async () => {
  // Give immediate feedback so the UI doesn't feel frozen
  outputEl.textContent = "Opening file picker…";

  // Call the safe API we exposed in preload.js
  const result = await window.api.openTextFile();

  // If the user canceled, show a friendly message
  if (result.canceled) {
    outputEl.textContent = "Canceled. Pick a .txt file to display its contents.";
    return;
  }

  // Show the chosen file path
  filePathEl.textContent = result.filePath;

  // Show the file contents
  outputEl.textContent = result.content;
});
