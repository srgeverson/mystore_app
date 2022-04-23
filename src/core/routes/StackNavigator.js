import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Gráficos
import Resultados from '../../views/screens/resultados';
import Clientes from '../../views/screens/resultados/Clientes';
import Compras from '../../views/screens/resultados/Compras';
import Produtos from '../../views/screens/resultados/Produtos';
import Vendas from '../../views/screens/resultados/Vendas';
//CRUD Cliente
import ListarClientes from '../../views/screens/clientes/Listar';
import ClientesCadastro from '../../views/screens/clientes/Cadastro';

const Stack = createStackNavigator();

const ClientesStackNavigator = () => {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="ListarClientes" component={ListarClientes} options={{ headerShown: false, title: 'Clientes' }} />
                <Stack.Screen name="ClientesCadastro" component={ClientesCadastro} options={{ headerShown: false, title: 'Cadastro de Clientes' }} />
            </Stack.Navigator>
        </>
    );
};

const ResultadosStackNavigator = () => {

    const screenOptionStyle = {
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

export { ClientesStackNavigator, ResultadosStackNavigator };