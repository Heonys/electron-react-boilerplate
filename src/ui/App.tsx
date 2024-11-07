import { useState, useEffect } from "react";
import useStatistics from "./hooks/useStatistics";
import Chart from "./components/Chart";
import "./app.css";

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

  const handleClick = (event: React.MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    switch (btn.id) {
      case "close": {
        return window.electron.sendFrameAction("CLOSE");
      }
      case "minimize": {
        return window.electron.sendFrameAction("MINIMIZE");
      }
      case "maxmize": {
        return window.electron.sendFrameAction("MAXIMIZE");
      }
    }
  };

  return (
    <div className="container">
      <header>
        <button id="close" onClick={handleClick} />
        <button id="minimize" onClick={handleClick} />
        <button id="maxmize" onClick={handleClick} />
      </header>
      <div style={{ width: 500, height: 120, marginTop: "10rem" }}>
        <Chart data={activeUsage()} maxDataPoint={10} />
      </div>
    </div>
  );
}

export default App;
