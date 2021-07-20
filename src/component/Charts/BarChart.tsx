import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface IBarChartComponentProps {
  width: number,
  height: number,
  data: IDataChart,
  options: IOptionsChart
}

interface IDataSetsInfo {
  label: string,
  data: string|number[],
  backgroundColor: string | string[],
  borderColor: string | string[],
  borderWidth?: number
}

interface IDataChart {
  labels: string | string[],
  datasets: IDataSetsInfo[]
}

interface IScalesOptions {
  y: {
    beginAtZero: boolean,
    callback?: any
  }
}

interface IOptionsChart {
  maintainAspectRatio: boolean,
  scales: IScalesOptions
}

const BarChartComponent: React.FunctionComponent<IBarChartComponentProps> = ({
  width,
  height,
  data,
  options
}) => {

  return (
    <div>
      <Bar
        type="bar"
        width={width}
        height={height}
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChartComponent;
