import { useEffect, useState } from "react";

const useStaticData = () => {
  const [value, setValue] = useState<StaticData | null>(null);

  useEffect(() => {
    window.electron.getStaticData().then(setValue);
  }, []);

  return value;
};

export default useStaticData;
