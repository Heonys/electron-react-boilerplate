import {} from "recharts";
import BaseChart from "./BaseChart";
import { useMemo } from "react";

type Props = {
  data: number[];
  maxDataPoint: number;
};

const Chart = ({ data, maxDataPoint }: Props) => {
  const preparedData = useMemo(() => {
    return [
      ...data.map((stat) => ({ value: stat * 100 })),
      ...Array.from({ length: maxDataPoint - data.length }, () => ({ value: undefined })),
    ];
  }, [data, maxDataPoint]);

  return <BaseChart data={preparedData} />;
};

export default Chart;
