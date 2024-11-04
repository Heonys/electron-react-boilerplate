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

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}
