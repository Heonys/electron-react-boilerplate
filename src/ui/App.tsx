import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleInvoke = async () => {
    const staticData = await window.electron.getStaticData();
    console.log(staticData);
  };

  useEffect(() => {
    const unsubscribeFn = window.electron.subscribeStatistics((statistics) => {
      console.log(statistics);
    });
    return unsubscribeFn;
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>++</button>
      <button onClick={handleInvoke}>static</button>
    </div>
  );
}

export default App;
