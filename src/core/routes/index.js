import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../views/usuario/Login';
{/* Rotas sem autênticação */}
import PrimeiroAcesso from '../../views/usuario/PrimeiroAcesso';
import RecuperarSenha from '../../views/usuario/RecuperarSenha';
{/* Rotas com autênticação */}
import BemVindo from '../../views/mystore/BemVindo';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Rotas sem autênticação */}
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} />
                <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
                {/* Rotas com autênticação */}
                <Stack.Screen name="BemVindo" component={BemVindo} />
                {/* 
                <Stack.Screen name="ListarFornecedor" component={ListarFornecedor} />
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
        </NavigationContainer>
    );
}

export default Routes;