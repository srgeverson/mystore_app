import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import AsyncStorage from '@react-native-community/async-storage';
import { AuthorityContext } from '../contexts';
//import { getValToken } from './services/auth';
import Login from '../../views/usuario/Login';
{/* Rotas sem autênticação */ }
import PrimeiroAcesso from '../../views/usuario/PrimeiroAcesso';
import RecuperarSenha from '../../views/usuario/RecuperarSenha';
{/* Rotas com autênticação */ }
import BemVindo from '../../views/mystore/BemVindo';

const Stack = createStackNavigator();


const Routes = () => {
    const [token, setToken] = useState(null);

    const authContext = useMemo(() => {
        return {
            signIn: async () => {
                //             const valToken = AsyncStorage.getItem('@token');
                //             setUserToken(valToken);
            },
            signOut: () => {
                //             AsyncStorage.removeItem('@token');
                //             setUserToken(null);
            }
        }
    }, []);

    const getToken = async () => {
        try {
            //         const valalidarToken = await getValToken();
            //         if (valToken !== null) {
            //             setUserToken(valToken);
            //         }
        } catch (error) {
            //         setUserToken(null);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthorityContext.Provider value={authContext}>

            <NavigationContainer>
                {token ? (
                    //Rotas com autênticação
                    <Stack.Navigator>
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
                ) : (
                    //Rotas sem autênticação
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
                        <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} options={{ headerShown: false, }} />
                        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: false, }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthorityContext.Provider>
    );
}

export default Routes;