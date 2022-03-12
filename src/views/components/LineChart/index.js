import React from 'react';
import { LineChart, Grid } from 'react-native-svg-charts';

const LineChartExample = (props) => {
    const data = props.dados;
    return (
        <LineChart
            style={{ height: 200 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
        >
            <Grid />
        </LineChart>
    )
}

export default LineChartExample;