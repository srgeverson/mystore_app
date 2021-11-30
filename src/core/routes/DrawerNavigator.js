import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BemVindoStackNavigator, ListarFornecedorStackNavigator } from './StackNavigator';
import { AuthorityContext } from '../contexts';
import { rootEntryPoint } from '../../services/UsuarioService';

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

    const [menusDisponiveis, setMenusDisponiveis] = useState([]);

    const getEndpoints = async () => {
        const entryPoint = await rootEntryPoint();
        setMenusDisponiveis([entryPoint._links]);
    }

    useEffect(() => {
        getEndpoints();
        //console.log(`Capturando endpoins...${JSON.stringify(menusDisponiveis)}`);
    }, []);

    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                backgroundColor: '#000',
                width: 240,
            },
            drawerStatusBarAnimation: 'fade'
        }} drawerContent={props => <DrawerCustom {...props} />}>
            <Drawer.Screen name="BemVindo" component={BemVindoStackNavigator} options={{ headerShown: true, title: 'MySore' }} />
            <Drawer.Screen name="ListarFornecedor" component={ListarFornecedorStackNavigator} options={{ headerShown: true, }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;