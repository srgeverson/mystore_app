import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BemVindoStackNavigator, ListarFornecedorStackNavigator } from './StackNavigator';
import { AuthorityContext } from '../contexts';

const Drawer = createDrawerNavigator();

const DrawerCustom = (props) => {

    const { signOut } = useContext(AuthorityContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => signOut()} />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerCustom {...props} />}>
            <Drawer.Screen name="BemVindo" component={BemVindoStackNavigator} options={{ headerShown: false, }} />
            <Drawer.Screen name="ListarFornecedor" component={ListarFornecedorStackNavigator} options={{ headerShown: false, }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;