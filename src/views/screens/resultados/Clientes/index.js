import React from "react";
import { SafeAreaView,ScrollView } from "react-native";
import styles from "./style";
import Pie from '../../../components/PieChart';
import Line from '../../../components/LineChart';
import LineX from '../../../components/LineChartAxisX';
import LineY from '../../../components/LineChartAxisY';
import Bar from '../../../components/BarChart';

const Clientes = () => {
  const data0 = [
    { id: 1, nome: 'Item 1', quantidade: 1.11 },
    { id: 2, nome: 'Item 2', quantidade: 2.22 },
    { id: 3, nome: 'Item 3', quantidade: 3.33 },
    { id: 4, nome: 'Item 3', quantidade: 4.44 },
  ]

  const data1 = [
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80
  ]

  const data2 = [
    {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
        oranges: 400,
    },
    {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
    },
    {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
    },
    {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
    },
]

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Pie dados={data0}/>
          <Line dados={data1}/>
          <LineX dados={data1}/>
          <LineY dados={data1}/>
          <Bar dados={data2}/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Clientes;