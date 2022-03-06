import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
import Resultados from '../../views/screens/resultados';
import Clientes from '../../views/screens/resultados/Clientes';
import Compras from '../../views/screens/resultados/Compras';
import Produtos from '../../views/screens/resultados/Produtos';
import Vendas from '../../views/screens/resultados/Vendas';

const Stack = createStackNavigator();


const ResultadosStackNavigator = () => {

    //const navigation = useNavigation();

    const screenOptionStyle = {
        //headerLeft: () => <Button icon={<Icon onPress={() => navigation.navigate('BemVindo')} name="home" size={20} color='#FFF' />} />,
        headerStyle: {
            backgroundColor: "#0B89D4",
        },
        headerTitleAlign: 'center',
        headerTitleStyle: { color: '#FFF' },
        headerTintColor: "white",
        headerBackTitle: 'Voltar',
    };

    return (
        <>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="Resultados" component={Resultados} options={{ headerShown: true, title: 'Resultados do Negócio' }} />
                <Stack.Screen name="ResultadosClientes" component={Clientes} options={{ headerShown: true, title: 'Análise dos Clientes' }} />
                <Stack.Screen name="ResultadosCompras" component={Compras} options={{ headerShown: true, title: 'Análise das Compras' }} />
                <Stack.Screen name="ResultadosProdutos" component={Produtos} options={{ headerShown: true, title: 'Análise dos Produtos' }} />
                <Stack.Screen name="ResultadosVendas" component={Vendas} options={{ headerShown: true, title: 'Análise das Vendas' }} />
            </Stack.Navigator>
        </>
    );
};

export { ResultadosStackNavigator };