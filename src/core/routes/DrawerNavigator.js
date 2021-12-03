import React, { useContext, useEffect, useState } from 'react';
import theme from '../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BemVindoStackNavigator, ListarCidadesStackNavigator, ListarEstadosStackNavigator, ListarPermissoesStackNavigator, ListarUsuariosStackNavigator } from './StackNavigator';
import { AuthorityContext } from '../contexts';
import { rootEntryPoint } from '../../services/UsuarioService';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

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

const DrawerNavigator = (props) => {

    const [menusDisponiveis, setMenusDisponiveis] = useState(null);

    const [offline, setOffLine] = useState(true);

    const getEndpoints = async () => {
        try {
            const entryPoint = await rootEntryPoint();
            if (entryPoint._links){
                setOffLine(false);
                setMenusDisponiveis(entryPoint._links);
            }
        } catch (error) {
            console.log(`Erro no método getEndpoints do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
        }
    }

    const getIcones = (icon, size, focused) => {
        try {
            return <Icon name={icon ? icon : 'exclamation-triangle'} size={size ? size : 20} color={focused ? '#007bff' : '#6c757d'} />
        } catch (error) {
            console.log(`Erro no método getIcones do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
            return <Icon name={icon ? icon : 'exclamation-triangle'} size={size ? size : 20} color={'#dc3545'} />
        }
    }
    const getHeaderLeft = () => {
        try {
            return (<Button
                icon={
                        <Icon
                            onPress={() => alert('ops')}
                            name="bars"
                            size={20}
                            color='#FFF' />
                }
            />);
        } catch (error) {
            console.log(`Erro no método getHeaderLeft do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
        }
    }
    const getHeaderRight = () => {
        try {
            return (<Button
                icon={
                    offline ?
                        <Icon
                            onPress={() => Alert.alert('Dispositivo off-line', 'Dados serão sincronizados com o servidor quando voltar a internet!')}
                            name="warning"
                            size={20}
                            color='#FFFF00' />
                        :
                        <Icon
                            onPress={() => Alert.alert('Dispositivo on-line', 'Dados estão sincronizados com o servidor!')}
                            name="refresh"
                            size={20}
                            color='#90EE90' />
                }
            />);
        } catch (error) {
            console.log(`Erro no método getHeaderRight do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
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
                headerShown: true, title: 'MyStore', drawerIcon: (focused) => getIcones('home', null, focused),
                headerTitleAlign: 'center',
                headerTitleStyle: {color: '#FFF'},
                //headerLeft: () => getHeaderLeft(),
                headerLeft: () => <Button title='teste' onPress={()=>navigation.openDrawer()}/>,
                headerRight: () => getHeaderRight(),
                headerStyle:{backgroundColor: '#1B8BD1',}
            }} />
            {menusDisponiveis && <Drawer.Screen name="ListarCidades" component={ListarCidadesStackNavigator} options={{ headerShown: true, title: 'Lista de Cidades', drawerIcon: (focused) => getIcones('building', null, focused), }} />}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarEmpresas" component={ListarEmpresasStackNavigator} options={{ headerShown: true, title: 'Lista de Empresas',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && <Drawer.Screen name="ListarEstados" component={ListarEstadosStackNavigator} options={{ headerShown: true, title: 'Lista de Estados', drawerIcon: (focused) => getIcones('globe', null, focused), }} />}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarFormasPagamento" component={ListarFormasPagamentoStackNavigator} options={{ headerShown: true, title: 'Lista de Formas de Pagamento',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarGrupos" component={ListarGruposStackNavigator} options={{ headerShown: true, title: 'Lista de Grupos',drawerIcon: (focused)=><Icon name='sign-out' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && <Drawer.Screen name="ListarPermissoes" component={ListarPermissoesStackNavigator} options={{ headerShown: true, title: 'Lista de Permissões', drawerIcon: (focused) => getIcones('unlock-alt', null, focused), }} />}
            {menusDisponiveis && <Drawer.Screen name="ListarUsuarios" component={ListarUsuariosStackNavigator} options={{ headerShown: true, title: 'Lista de Usuarios', drawerIcon: (focused) => getIcones('users', null, focused), }} />}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;