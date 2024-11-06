import { useEffect, useState } from "react";

const useStatistics = (bufferSize: number) => {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsubscribeFn = window.electron.subscribeStatistics((statistics) => {
      setValue((prev) => {
        const newData = [...prev, statistics];
        if (newData.length > bufferSize) newData.shift();
        return newData;
      });
    });
    return unsubscribeFn;
  }, [bufferSize]);

  return value;
};

export default useStatistics;
