import Chart from "./Chart";

type Props = {
  title: string;
  view: View;
  subTitle: string;
  data: number[];
  onClick: () => void;
};

const SelectOptionButton = ({ title, view, subTitle, data, onClick }: Props) => {
  return (
    <button className="select-btn" onClick={onClick}>
      <div className="select-title">
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
      <div className="select-chart">
        <Chart selectedView={view} data={data} maxDataPoint={10} />
      </div>
    </button>
  );
};

export default SelectOptionButton;
