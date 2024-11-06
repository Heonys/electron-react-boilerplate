import { app, BrowserWindow, Tray, Menu } from "electron";
import path from "node:path";
import { getAssets } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssets(), "trayIcon.png"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
        },
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ])
  );
}
