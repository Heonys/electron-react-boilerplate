import { app, WebContents, WebFrameMain, ipcMain } from "electron";
import { pathToFileURL } from "node:url";
import { getUIPath } from "./pathResolver.js";

export const isDev = !app.isPackaged;

export function ipcMainHandler<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  handler: () => EventPayloadMapping[Channel]
) {
  ipcMain.handle(channel, (event) => {
    validationEventFrame(event.senderFrame);
    return handler();
  });
}

export function ipcWebContentsSend<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  webContents: WebContents,
  payload: EventPayloadMapping[Channel]
) {
  webContents.send(channel, payload);
}

export function validationEventFrame(frame: WebFrameMain) {
  if (isDev && new URL(frame.url).host === "localhost:5123") return;
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious event");
  }
}
