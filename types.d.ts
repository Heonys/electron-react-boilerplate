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
type WindowFrameAction = "CLOSE" | "MINIMIZE" | "MAXIMIZE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  sendFrameAction: WindowFrameAction;
};

type CleanUp = () => void;

interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => CleanUp;
    subscribeChangeView: (callback: (view: View) => void) => CleanUp;
    getStaticData: () => Promise<StaticData>;
    sendFrameAction: (payload: WindowFrameAction) => void;
  };
}
