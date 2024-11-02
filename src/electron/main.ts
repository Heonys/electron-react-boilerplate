import { app, BrowserWindow } from "electron";
import path from "path";

/* 
app
node.js랑 마찬가지로 이벤트기반의 api
일렉트론 어플리케이션의 생명주기를 관리

*/

function createWindow() {
  const mainWindow = new BrowserWindow({
    // 굉장히 많은 옵션들
  });
  mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  //  C:\user\desktop\resouce-manager
  //  /dist-react/index.html
}

app.whenReady().then(createWindow);
