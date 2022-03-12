import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { FlatList, Text as Text2 } from 'react-native';

const PieChartExample = (props) => {

    const data = props.dados;

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data.map((produto, index) => ({
        value: produto.quantidade,
        key: produto.id,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        }
    }));

    const Label = ({ slices }) => {
        return slices.map((slice) => {
            const { pieCentroid, data } = slice;

            return (
                <Text
                    key={data.key}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="#000"
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={16}>
                    {data.key}
                </Text>
            )
        })
    }

    return (
        <>
            <PieChart style={{ height: 300 }} data={pieData}>
                <Label />
            </PieChart>

            {/* <FlatList
                data={data}
                renderItem={({ item }) => (
                    <>
                        <Text2>
                            Código: {item.id} Descrição: {item.nome} Quantidade: {item.quantidade}
                        </Text2>
                    </>
                )} keyExtractor={produto => String(produto.id)}
            /> */}
        </>
    );

}

export default PieChartExample;