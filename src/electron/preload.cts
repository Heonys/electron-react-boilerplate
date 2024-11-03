const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  get: () => console.log("get"),
  set: () => console.log("set"),
});
