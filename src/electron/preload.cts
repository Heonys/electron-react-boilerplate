const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => ipcOn("statistics", callback),
  subscribeChangeView: (callback) => ipcOn("changeView", callback),
  getStaticData: () => ipcInvoke("getStaticData"),
  sendFrameAction: (frame) => ipcSend("sendFrameAction", frame),
} satisfies Window["electron"]);

function ipcInvoke<Channel extends keyof EventPayloadMapping>(
  channel: Channel
): Promise<EventPayloadMapping[Channel]> {
  return ipcRenderer.invoke(channel);
}

function ipcOn<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  listener: (payload: EventPayloadMapping[Channel]) => void
) {
  const callback = (_: Electron.IpcRendererEvent, payload: EventPayloadMapping[Channel]) => {
    return listener(payload);
  };
  ipcRenderer.on(channel, callback);
  return () => ipcRenderer.off(channel, callback);
}

function ipcSend<Channel extends keyof EventPayloadMapping>(
  channel: Channel,
  payload: EventPayloadMapping[Channel]
) {
  ipcRenderer.send(channel, payload);
}
