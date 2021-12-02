import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BemVindo from '../../views/screens/mystore/BemVindo';
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
            {/* 
            Rotas com autênticação
                     <Stack.Screen name="CadastrarFornecedor" component={CadastrarFornecedor} />
                     <Stack.Screen name="ListarProduto" component={ListarProduto} />
                     <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
                     <Stack.Screen name="ListarCliente" component={ListarCliente} />
                     <Stack.Screen name="CadastrarCliente" component={CadastrarCliente} />
                     <Stack.Screen name="ListarVenda" component={ListarVenda} />
                     <Stack.Screen name="CadastrarVenda" component={CadastrarVenda} />
                     <Stack.Screen name="ListarContaPagar" component={ListarContaPagar} />
                     <Stack.Screen name="CadastrarContaPagar" component={CadastrarContaPagar} />
                     <Stack.Screen name="ListarContaReceber" component={ListarContaReceber} />
                     <Stack.Screen name="CadastrarContaReceber" component={CadastrarContaReceber} />
                     <Stack.Screen name="Dashboard" component={Dashboard} />
                     <Stack.Screen name="Relatorio" component={Relatorio} />
                      */}
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

export { BemVindoStackNavigator, ListarCidadesStackNavigator, ListarEstadosStackNavigator, ListarPermissoesStackNavigator, ListarUsuariosStackNavigator };