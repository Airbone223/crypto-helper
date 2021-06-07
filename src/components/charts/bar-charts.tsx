import React from "react"
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartTooltip
} from '@progress/kendo-react-charts'
import 'hammerjs'
import {TimeSeriesInterface} from "../../interfaces/interfaces"

type PropTypes = {
    timeSeries: TimeSeriesInterface[],
    coinName: string
}


const tooltipRender:React.FC<any> = ({ point }) =>(
    <div>
        <strong>Low price: </strong>{point.value && point.value.from} $
        <br />
        <strong>High price: </strong>{point.value && point.value.to} $
    </div>)


const BarChart:React.FC<PropTypes> = ({timeSeries, coinName}) => {
    const data = timeSeries.map( (item, idx) => {
        return ({
            "low": item.low,
            "high": item.high
        })
    })

  return (
    <Chart>
        <ChartTitle text={`${coinName} daily chart`} />
        <ChartSeries>
            <ChartSeriesItem
                gap={1}
                type="rangeColumn"
                data={data}
                fromField="low"
                toField="high"
            >
            </ChartSeriesItem>
        </ChartSeries>
        <ChartTooltip render={tooltipRender} />
    </Chart>
)
}

export default BarChart
