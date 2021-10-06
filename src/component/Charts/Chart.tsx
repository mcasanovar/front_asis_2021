import * as React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
// import { ChartOptions } from 'chart.js';

interface IChartComponentProps {
  width: number,
  height: number,
  data: IDataChart,
  options: IOptionsChart,
  type?: string
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
  responsive?: boolean
  maintainAspectRatio: boolean,
  scales?: IScalesOptions
}

const ChartComponent: React.FunctionComponent<IChartComponentProps> = ({
  width,
  height,
  data,
  options,
  type = 'bar'
}) => {

  return (
    <div>
      {type === 'bar' &&
        <Bar
          type
          width={500}
          height={115}
          data={data}
          options={options}
        />
      }
      {type === 'line' &&
        <Line
          type
          width={width}
          height={height}
          data={data}
          options={options}
        />
      }
      {type === 'pie' &&
        <Pie
          type
          width={width}
          height={height}
          data={data}
          options={options}
        />
      }
    </div>
  );
};

export default ChartComponent;
