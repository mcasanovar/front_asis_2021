import { ChartData } from 'chart.js'
import * as React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
// import { ChartOptions } from 'chart.js';

// type IDataSetsInfo = {
//     label?: string
//     data: string | number[]
//     backgroundColor: string | string[]
//     borderColor: string | string[]
//     borderWidth?: number
// }

// type IDataChart = {
//     labels: string | string[]
//     datasets: IDataSetsInfo[]
// }

// type IChartComponentProps = {
//     width: number
//     height: number
//     data:
//         | ChartData<'bar', string | number[], string>
//         | ((
//               canvas: HTMLCanvasElement
//           ) => ChartData<'bar', string | number[], string>)
//     options: IOptionsChart
//     type?: string
// }

// type IScalesOptions = {
//     y: {
//         beginAtZero: boolean
//         callback?: any
//     }
// }

// type ILabelsLegend = {
//     fontSize: number
// }

// type ILegend = {
//     display: boolean
//     labels?: ILabelsLegend
// }

// type ITitle = {
//     display: boolean
//     text: ''
// }

// type IOptionsChart = {
//     responsive?: boolean
//     maintainAspectRatio: boolean
//     scales?: IScalesOptions
//     legend?: ILegend
//     title?: ITitle
//     tooltips?: any
// }

const ChartComponent: React.FunctionComponent<any> = ({
    width,
    height,
    data,
    options,
    type = 'bar',
}) => {
    return (
        <div>
            {type === 'bar' && (
                <Bar
                    width={width}
                    height={height}
                    data={data}
                    options={options}
                />
            )}
            {type === 'line' && (
                <Line
                    width={width}
                    height={height}
                    data={data}
                    options={options}
                />
            )}
            {type === 'pie' && (
                <Pie
                    width={width}
                    height={height}
                    data={data}
                    options={options}
                />
            )}
        </div>
    )
}

export default ChartComponent
