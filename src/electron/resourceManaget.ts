import osUtils from "os-utils";
import os from "os";
import fs from "fs";

const POLLING_INTERVAL = 500;

export function pollResource() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const storageData = getStorageData();
    const memoryUsage = getMemoryUsage();
    console.log({ cpuUsage, storageData, memoryUsage });
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totlaMemoryGB = Math.floor(osUtils.totalmem() / 1024);
  return { totalStorage, cpuModel, totlaMemoryGB };
}

function getCpuUsage() {
  return new Promise((resolve) => osUtils.cpuUsage(resolve));
}

function getMemoryUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stat = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stat.bsize * stat.blocks;
  const free = stat.bsize * stat.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
