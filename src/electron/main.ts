import { app, BrowserWindow } from "electron";
import { ipcMainHandler, ipcMainOn, isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData, pollResource } from "./resourceManaget.js";
import { createTray } from "./tray.js";
import { createApplicationMemu } from "./menu.js";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: getPreloadPath(),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResource(mainWindow);
  ipcMainHandler("getStaticData", () => getStaticData());
  ipcMainOn("sendFrameAction", (frame) => {
    switch (frame) {
      case "CLOSE": {
        mainWindow?.close();
        break;
      }
      case "MINIMIZE": {
        mainWindow?.minimize();
        break;
      }
      case "MAXIMIZE": {
        mainWindow?.maximize();
        break;
      }
    }
  });

  createApplicationMemu(mainWindow);
  createTray(mainWindow);
  handleCloseEvent(mainWindow);
}

app.whenReady().then(createWindow);

function handleCloseEvent(mainWindow: BrowserWindow) {
  let willclose = false;

  mainWindow.on("close", (event) => {
    if (willclose) return;

    event.preventDefault();
    mainWindow.hide();
    if (app.dock) app.dock.hide();
  });

  app.on("before-quit", () => {
    willclose = true;
  });

  mainWindow.on("show", () => {
    willclose = false;
  });
}

/* 

시나리오 
1. x버튼을 눌러서 윈도우를 종료함 (창을 종료) 
2. fiie-exit 또는 어떠한 방식으로든 직접 프로세스를 종료함 


이벤트 
1. close -> before-quit -> will-quit -> quit 
2. before-quit -> [close, close, close ... ] -> will-quit -> quit 

*/
