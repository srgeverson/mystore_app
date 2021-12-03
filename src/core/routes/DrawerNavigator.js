import React, { useContext, useEffect, useState } from 'react';
import theme from '../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BemVindoStackNavigator, ListarCidadesStackNavigator, ListarEstadosStackNavigator, ListarPermissoesStackNavigator, ListarUsuariosStackNavigator } from './StackNavigator';
import { AuthorityContext } from '../contexts';
import { rootEntryPoint } from '../../services/UsuarioService';

const Drawer = createDrawerNavigator();

const DrawerCustom = (props) => {

    const { signOut } = useContext(AuthorityContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => signOut()} icon={() => <Icon name='sign-out' size={20} color='#007bff' />} />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {

    const [menusDisponiveis, setMenusDisponiveis] = useState(null);

    const getEndpoints = async () => {
        try {
            const entryPoint = await rootEntryPoint();
            if (entryPoint._links)
                setMenusDisponiveis(entryPoint._links);
        } catch (error) {
            console.log(`Erro no método getEndpoints do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
        }
    }

    useEffect(() => {
        getEndpoints();
    }, []);

    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
                backgroundColor: '#000',
                width: 240,

            },
            drawerStatusBarAnimation: 'fade'
        }} drawerContent={props => <DrawerCustom {...props} />}>
            <Drawer.Screen name="BemVindo" component={BemVindoStackNavigator} options={{
                headerShown: true, title: 'MyStore', drawerIcon: (focused) => <Icon name='home' size={20} color={focused ? '#007bff' : '#6c757d'} />,
            }} />
            {menusDisponiveis && <Drawer.Screen name="ListarCidades" component={ListarCidadesStackNavigator} options={{ headerShown: true, title: 'Lista de Cidades', drawerIcon: (focused) => <Icon name='building' size={20} color={focused ? '#007bff' : '#6c757d'} />, }} />}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarEmpresas" component={ListarEmpresasStackNavigator} options={{ headerShown: true, title: 'Lista de Empresas',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && <Drawer.Screen name="ListarEstados" component={ListarEstadosStackNavigator} options={{ headerShown: true, title: 'Lista de Estados', drawerIcon: (focused) => <Icon name='globe' size={20} color={focused ? '#007bff' : '#6c757d'} />, }} />}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarFormasPagamento" component={ListarFormasPagamentoStackNavigator} options={{ headerShown: true, title: 'Lista de Formas de Pagamento',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarGrupos" component={ListarGruposStackNavigator} options={{ headerShown: true, title: 'Lista de Grupos',drawerIcon: (focused)=><Icon name='sign-out' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && <Drawer.Screen name="ListarPermissoes" component={ListarPermissoesStackNavigator} options={{ headerShown: true, title: 'Lista de Permissões', drawerIcon: (focused) => <Icon name='unlock-alt' size={20} color={focused ? '#007bff' : '#6c757d'} />, }} />}
            {menusDisponiveis && <Drawer.Screen name="ListarUsuarios" component={ListarUsuariosStackNavigator} options={{ headerShown: true, title: 'Lista de Usuarios', drawerIcon: (focused) => <Icon name='users' size={20} color={focused ? '#007bff' : '#6c757d'} />, }} />}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;