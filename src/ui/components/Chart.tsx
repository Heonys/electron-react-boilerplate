import {} from "recharts";
import BaseChart from "./BaseChart";
import { useMemo } from "react";
import { COLOR_MAP } from "../constants";

type Props = {
  data: number[];
  maxDataPoint: number;
  selectedView: View;
};

const Chart = ({ data, maxDataPoint, selectedView }: Props) => {
  const color = COLOR_MAP[selectedView];
  const preparedData = useMemo(() => {
    return [
      ...data.map((stat) => ({ value: stat * 100 })),
      ...Array.from({ length: maxDataPoint - data.length }, () => ({ value: undefined })),
    ];
  }, [data, maxDataPoint]);

  return <BaseChart fill={color.fill} stroke={color.stroke} data={preparedData} />;
};

export default Chart;
