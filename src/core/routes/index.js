import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../views/usuario/Login';
import Cadastrar from '../../views/usuario/Cadastrar';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastrar" component={Cadastrar} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;