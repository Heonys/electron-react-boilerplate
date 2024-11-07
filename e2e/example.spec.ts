import { test, expect, _electron, ElectronApplication, Page } from "@playwright/test";

let electronApp: ElectronApplication;
let mainPage: Page;

test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });
  mainPage = await electronApp.firstWindow();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("커스텀 프레임의 minimize 버튼은 윈도우를 최소화 한다", async () => {
  await mainPage.click("#minimize");
  const isMinimized = await electronApp.evaluate((electron) => {
    return electron.BrowserWindow.getAllWindows()[0].isMinimized();
  });
  expect(isMinimized).toBeTruthy();
});
