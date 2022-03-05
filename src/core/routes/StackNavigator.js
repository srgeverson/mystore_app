import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Teste from '../../views/screens/mystore/Test';
import ListarCidades from '../../views/screens/cidades/Listar';
import ListarEstados from '../../views/screens/estados/Listar';
import ListarPermissoes from '../../views/screens/permissoes/Listar';
import Resultados from '../../views/screens/resultados';
import ListarUsuarios from '../../views/screens/usuario/Listar';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerBackTitle: "Voltar",
}

const ListarCidadesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarCidades" component={ListarCidades} options={{ headerShown: false, }} />
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

const ListarPermissoesStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ListarPermissoes" component={ListarPermissoes} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

const ResultadosStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Resultados" component={Resultados} options={{ headerShown: false, }} />
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
    ListarCidadesStackNavigator,
    ListarEstadosStackNavigator,
    ListarPermissoesStackNavigator,
    ResultadosStackNavigator,
    ListarUsuariosStackNavigator,
    Teste,
};