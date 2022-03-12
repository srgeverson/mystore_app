import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'

const StackedBarChartExample=(props)=> {
        const data = props.dados

        const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
        const keys = ['apples', 'bananas', 'cherries', 'dates']

        return (
            <StackedBarChart
                style={{ height: 200 }}
                keys={keys}
                colors={colors}
                data={data}
                showGrid={false}
                contentInset={{ top: 30, bottom: 30 }}
            />
        )
    }

export default StackedBarChartExample;