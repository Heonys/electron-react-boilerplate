import { app, WebContents, ipcMain } from "electron";

export const isDev = !app.isPackaged;

export function ipcMainHandler<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  hanlder: () => EventPayloadMapping[Channel]
) {
  ipcMain.handle(channel, () => hanlder());
}

export function ipcWebContentsSend<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  webContents: WebContents,
  payload: EventPayloadMapping[Channel]
) {
  webContents.send(channel, payload);
}
