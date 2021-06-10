import React from 'react'
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle
} from '@progress/kendo-react-charts'
import 'hammerjs'
import {DataForDiagram} from "../../pages/wallet"


type DiagramProps = {
    data: DataForDiagram[]
}


const Diagram:React.FC<DiagramProps> = ({data}) => {
    const amount = data.reduce((total, item)=>{
        return total+=item.price
    }, 0)
    type LabelContentType = {
        dataItem: {
            price: number,
            symbol: string
        }
    }

    const labelContent = ({dataItem}: LabelContentType) => {
        return `${dataItem.symbol}: ${(dataItem.price/amount*100).toFixed(2)}%`
    }
    return <Chart>
        <ChartTitle text={`Your balance structure. Amount: ${amount.toFixed(2)} $`}/>
        <ChartLegend position="bottom"/>
        <ChartSeries>
            <ChartSeriesItem type="pie" data={data} field="price" categoryField="symbol"
                             labels={{visible: true, content: labelContent}}/>
        </ChartSeries>
    </Chart>
}

export default Diagram

