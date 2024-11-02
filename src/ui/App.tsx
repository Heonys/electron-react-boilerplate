import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>++</button>
    </div>
  );
}

export default App;
