type Statistics = {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totlaMemoryGB: number;
};

type View = "CPU" | "RAM" | "STORAGE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
};

type CleanUp = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => CleanUp;
    subscribeChangeView: (callback: (view: View) => void) => CleanUp;
    getStaticData: () => Promise<StaticData>;
  };
}
