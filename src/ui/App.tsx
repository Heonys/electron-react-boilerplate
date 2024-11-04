import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    window.electron.subscribeStatistics((statistics) => {
      console.log(statistics);
    });
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>++</button>
      <button>구독</button>
    </div>
  );
}

export default App;
