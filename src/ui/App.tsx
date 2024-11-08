import { useState, useEffect } from "react";
import useStatistics from "./hooks/useStatistics";
import Chart from "./components/Chart";
import "./app.css";
import WindowFrame from "./components/WindowFrame";
import SelectOptionButton from "./components/SelectOptionButton";
import useStaticData from "./hooks/useStaticData";

function App() {
  const [activeView, setActiveView] = useState<View>("CPU");
  const statistics = useStatistics(10);
  const staticData = useStaticData();
  const cpuUsage = statistics.map((stat) => stat.cpuUsage);
  const memoryUsage = statistics.map((stat) => stat.memoryUsage);
  const storageUsage = statistics.map((stat) => stat.storageUsage);

  const activeUsage = () => {
    switch (activeView) {
      case "CPU": {
        return cpuUsage;
      }
      case "RAM": {
        return memoryUsage;
      }
      case "STORAGE": {
        return storageUsage;
      }
    }
  };

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => {
      setActiveView(view);
    });
  }, []);

  return (
    <div>
      <WindowFrame />
      <div className="gird-container">
        <div>
          <SelectOptionButton
            title="CPU"
            view="CPU"
            subTitle={staticData?.cpuModel ?? ""}
            data={cpuUsage}
            onClick={() => setActiveView("CPU")}
          />
          <SelectOptionButton
            title="RAM"
            view="RAM"
            subTitle={`${staticData?.totlaMemoryGB.toString() ?? ""} GB`}
            data={memoryUsage}
            onClick={() => setActiveView("RAM")}
          />
          <SelectOptionButton
            title="STORAGE"
            view="STORAGE"
            subTitle={`${staticData?.totalStorage ?? ""} GB`}
            data={storageUsage}
            onClick={() => setActiveView("STORAGE")}
          />
        </div>
        <div className="main-grid">
          <Chart selectedView={activeView} data={activeUsage()} maxDataPoint={10} />
        </div>
      </div>
    </div>
  );
}

export default App;
