import { useState } from "react";
import useStatistics from "./hooks/useStatistics";
import Chart from "./components/Chart";
import { useEffect } from "react";

function App() {
  const [activeView, setActiveView] = useState<View>("CPU");
  const statistics = useStatistics(10);
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
  });

  return (
    <div>
      <div style={{ width: 500, height: 120 }}>
        <Chart data={activeUsage()} maxDataPoint={10} />
      </div>
    </div>
  );
}

export default App;
