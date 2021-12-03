import React, { useContext, useEffect, useState } from 'react';
import theme from '../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BemVindoStackNavigator, ListarCidadesStackNavigator, ListarEstadosStackNavigator, ListarPermissoesStackNavigator, ListarUsuariosStackNavigator } from './StackNavigator';
import { AuthorityContext } from '../contexts';
import { rootEntryPoint } from '../../services/UsuarioService';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';

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
            if (entryPoint._links) {
                setOffLine(false);
                setMenusDisponiveis(entryPoint._links);
            } else {
                setOffLine(true);
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
        {console.log(offline)}
        try {
            return (
            <Button
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
                            name="check-circle"
                            size={20}
                            color='#90EE90' />
                }
            />);
        } catch (error) {
            console.log(`Erro no método getHeaderRight do arquivo DrawerNavigator -> ${new Date()} -> erro: ${error}`);
        }
    }

    const getScrens = (name, component, title, icone) => {
        return (
            <Drawer.Screen name={name} component={component} options={{
                headerShown: true, title: title, drawerIcon: (focused) => getIcones(icone, null, focused),
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#FFF' },
                headerLeft: () => getHeaderLeft(),
                //headerLeft: () => <Button title='teste' onPress={() => navigation.openDrawer()} />,
                headerRight: () => getHeaderRight(),
                headerStyle: { backgroundColor: '#1B8BD1', }
            }} />
        );
    }

    useEffect(() => {
        getEndpoints();
    }, []);

    return (
        <Drawer.Navigator drawerContent={props => <DrawerCustom {...props} />}>
            {true && getScrens('BemVindo', BemVindoStackNavigator, 'MyStore', 'home')}
            {menusDisponiveis && getScrens("ListarCidades", ListarCidadesStackNavigator, 'Lista de Cidades', 'building')}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarEmpresas" component={ListarEmpresasStackNavigator} options={{ headerShown: true, title: 'Lista de Empresas',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && getScrens("ListarEstados", ListarEstadosStackNavigator, 'Lista de Estados', 'globe')}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarFormasPagamento" component={ListarFormasPagamentoStackNavigator} options={{ headerShown: true, title: 'Lista de Formas de Pagamento',drawerIcon: (focused)=><Icon name='home' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {/* {menusDisponiveis && <Drawer.Screen name="ListarGrupos" component={ListarGruposStackNavigator} options={{ headerShown: true, title: 'Lista de Grupos',drawerIcon: (focused)=><Icon name='sign-out' size={20} color={focused? '#007bff' : '#6c757d'}/>  , }} />} */}
            {menusDisponiveis && getScrens("ListarPermissoes", ListarPermissoesStackNavigator, 'Lista de Permissões', 'unlock-alt')}
            {menusDisponiveis && getScrens("ListarUsuarios", ListarUsuariosStackNavigator, 'Lista de Usuarios', 'users')}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;