import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BemVindoStackNavigator } from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="BemVindo" component={BemVindoStackNavigator} options={{ headerShown: false, }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;