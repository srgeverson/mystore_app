import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BemVindo from '../../views/screens/mystore/BemVindo';
import Teste from '../../views/screens/mystore/Test';
import ListarCidades from '../../views/screens/cidades/Listar';
import ListarClientes from '../../views/screens/clientes/Listar';
import ListarCompras from '../../views/screens/compras/Listar';
import CadastrarCidades from '../../views/screens/cidades/Cadastrar';
import ListarEstados from '../../views/screens/estados/Listar';
import ListarPedidos from '../../views/screens/pedidos/Listar';
import ListarPermissoes from '../../views/screens/permissoes/Listar';
import ListarResultados from '../../views/screens/resultados/Listar';
import ListarUsuarios from '../../views/screens/usuario/Listar';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerBackTitle: "Voltar",
}

const BemVindoStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const CadastrarCidadeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="CadastrarCidade" component={CadastrarCidades} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarCidadesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarCidades" component={ListarCidades} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarClientesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarClientes" component={ListarClientes} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarComprasStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarCompras" component={ListarCompras} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarEstadosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarFornecedor" component={ListarEstados} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarPedidosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarPedidos" component={ListarPedidos} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarPermissoesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarPermissoes" component={ListarPermissoes} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarResultadosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarResultados" component={ListarResultados} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ListarUsuariosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarFornecedor" component={ListarUsuarios} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

export {
    BemVindoStackNavigator,
    CadastrarCidadeStackNavigator,
    ListarCidadesStackNavigator,
    ListarClientesStackNavigator,
    ListarComprasStackNavigator,
    ListarEstadosStackNavigator,
    ListarPermissoesStackNavigator,
    ListarPedidosStackNavigator,
    ListarResultadosStackNavigator,
    ListarUsuariosStackNavigator,
    Teste,
};