# Electron Demo: Local `.txt` File Viewer

This demo is a simple Electron desktop app that lets you click **Open .txt file**, choose a local text file from your computer, and display its contents in the app window.

It’s designed to clearly show:
- **Renderer process (Chromium)** = the UI (HTML/CSS/JS)
- **Main process (Node.js)** = native desktop capabilities (file dialog + filesystem)
- **IPC** = communication between renderer ↔ main

---

## What You'll Build / See
A desktop window with:
- a button: **Open .txt file**
- a file path label
- a large output area showing the file contents

---

## Prerequisites
- **Node.js** installed

Verify with:
```bash
node -v
npm -v
```
---

## Project Structure
```text
electron-demo/
├── main.js        # Main process (creates window, opens file dialog, reads file)
├── preload.js     # Safe bridge (exposes API to renderer)
├── renderer.js    # Renderer logic (button click + updates UI)
├── index.html     # Renderer UI
├── demo.txt       # Sample file to open
├── package.json
└── package-lock.json
```

---

## Setup
1) Clone the repo:
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <YOUR_REPO_FOLDER_NAME>
```
2) Install dependencies:
```bash
npm install
```
___

## Running the App
Start Electron:
```bash
npm start
```

You should see the Electron window open.

___

## How to Use the Demo

1) Open a local text file
2) Click Open .txt file
3) Select demo.txt (included in this repo) or any .txt file on your computer
4) The file contents will appear in the app




