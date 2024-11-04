import { app, BrowserWindow } from "electron";
import { ipcMainHandler, isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData, pollResource } from "./resourceManaget.js";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResource(mainWindow);
  ipcMainHandler("getStaticData", () => getStaticData());
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
