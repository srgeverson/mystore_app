import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BemVindo from '../../views/screens/mystore/BemVindo';
import Teste from '../../views/screens/mystore/Test';
import ListarCidades from '../../views/screens/cidades/Listar';
import ListarEstados from '../../views/screens/estados/Listar';
import ListarPermissoes from '../../views/screens/permissoes/Listar';
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

const TesteStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Teste" component={Teste} options={{ headerShown: false, }} />
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
            <Stack.Screen name="ListarFornecedor" component={ListarPermissoes} options={{ headerShown: false, }} />
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

export { BemVindoStackNavigator, Teste, ListarCidadesStackNavigator, ListarEstadosStackNavigator, ListarPermissoesStackNavigator, ListarUsuariosStackNavigator };