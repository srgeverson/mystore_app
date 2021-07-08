import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
//import AsyncStorage from '@react-native-community/async-storage';
import { AuthorityContext } from '../contexts';
//import { getValToken } from './services/auth';
import Login from '../../views/usuario/Login';
import PrimeiroAcesso from '../../views/usuario/PrimeiroAcesso';
import RecuperarSenha from '../../views/usuario/RecuperarSenha';
import BemVindo from '../../views/mystore/BemVindo';

const Stack = createStackNavigator();

const Routes = () => {
    const [token, setToken] = useState('null');

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
                {
                    token ? (
                        <DrawerNavigator />
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
                            <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} options={{ headerShown: false, }} />
                            <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{ headerShown: false, }} />
                        </Stack.Navigator>
                    )
                }
            </NavigationContainer>
        </AuthorityContext.Provider>
    );
}

export default Routes;