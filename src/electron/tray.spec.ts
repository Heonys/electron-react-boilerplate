import { expect, it, vi, Mock } from "vitest";
import { createTray } from "./tray.js";
import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";

vi.mock("electron", () => ({
  app: {
    quit: vi.fn(),
    getAppPath: vi.fn().mockReturnValue("/"),
  },
  Tray: vi.fn().mockReturnValue({
    setContextMenu: vi.fn(),
  }),
  Menu: {
    buildFromTemplate: vi.fn(),
  },
}));

const mainWindow = { show: vi.fn() } satisfies Partial<BrowserWindow> as any as BrowserWindow;

it("트레이 메뉴 항목 클릭 시 각 항목에 대응하는 함수 호출 확인", () => {
  createTray(mainWindow);

  const calls = (Menu.buildFromTemplate as Mock).mock.calls;
  const template = calls[0][0] as MenuItemConstructorOptions[];

  expect(template).toHaveLength(2);
  expect(template[0].label).toEqual("Show");
  expect(template[1].label).toEqual("Quit");
  template[0]?.click?.(null as any, null as any, null as any);
  expect(mainWindow.show).toHaveBeenCalled();

  template[1]?.click?.(null as any, null as any, null as any);
  expect(app.quit).toHaveBeenCalled();
});

// 모킹 해제?
