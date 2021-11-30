import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import { AuthorityContext } from '../contexts';
import { getTokenLogin, limparTokenLogin } from '../../services/UsuarioService';
import Login from '../../views/usuario/Login';
import PrimeiroAcesso from '../../views/usuario/PrimeiroAcesso';
import RecuperarSenha from '../../views/usuario/RecuperarSenha';

const Stack = createStackNavigator();

const Routes = () => {
    const [token, setToken] = useState(null);

    const authorizationContext = useMemo(() => {
        return {
            signIn: () => {
                try {
                    getToken();
                } catch (error) {
                    console.log(`Erro na função signIn -> ${new Date()} -> erro: ${error}`);
                }
            },
            signOut: () => {
                try {
                    limparTokenLogin();
                    setToken(null);
                } catch (error) {
                    console.log(`Erro na função signOut -> ${new Date()} -> erro: ${error}`);
                }
            }
        }
    }, []);

    const getToken = async () => {
        try {
            const valueToken = await getTokenLogin();
            if (valueToken !== null) {
                setToken(valueToken);
            }
        } catch (error) {
            console.log(`Erro na função getToken -> ${new Date()} -> erro: ${error}`);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthorityContext.Provider value={authorizationContext}>
            <NavigationContainer>
                {
                    token ? (
                        <DrawerNavigator />
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
                            <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Validar Primeiro acesso' }} />
                            <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Recuperar Senha' }} />
                        </Stack.Navigator>
                    )
                }
            </NavigationContainer>
        </AuthorityContext.Provider>
    );
}

export default Routes;