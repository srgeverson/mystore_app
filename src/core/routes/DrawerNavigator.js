import React, { useContext, useEffect, useState } from 'react';
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
            <DrawerItem label="Sair" onPress={() => signOut()} />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {

    const [menusDisponiveis, setMenusDisponiveis] = useState(null);

    const getEndpoints = async () => {
        const entryPoint = await rootEntryPoint();
        setMenusDisponiveis(entryPoint);
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
            <Drawer.Screen name="BemVindo" component={BemVindoStackNavigator} options={{ headerShown: true, title: 'MySore' }} />
            
            {/* {menusDisponiveis._links.cidades && <Drawer.Screen name="ListarCidades" component={ListarCidadesStackNavigator} options={{ headerShown: true, title: 'Lista de Cidades' }} />}
            {menusDisponiveis._links.empresas && <Drawer.Screen name="ListarEmpresas" component={ListarEmpresasStackNavigator} options={{ headerShown: true, title: 'Lista de Empresas' }} />}
            {menusDisponiveis._links.estados && <Drawer.Screen name="ListarEstados" component={ListarEstadosStackNavigator} options={{ headerShown: true, title: 'Lista de Estados' }} />}
            {menusDisponiveis._links.formas-pagamento && <Drawer.Screen name="ListarFormasPagamento" component={ListarFormasPagamentoStackNavigator} options={{ headerShown: true, title: 'Lista de Formas de Pagamento' }} />}
            {menusDisponiveis._links.grupos && <Drawer.Screen name="ListarGrupos" component={ListarGruposStackNavigator} options={{ headerShown: true, title: 'Lista de Grupos' }} />}
            {menusDisponiveis._links.permissoes && <Drawer.Screen name="ListarPermissoes" component={ListarPermissoesStackNavigator} options={{ headerShown: true, title: 'Lista de Permissões' }} />}
            {menusDisponiveis._links.usuarios && <Drawer.Screen name="ListarUsuarios" component={ListarUsuariosStackNavigator} options={{ headerShown: true, title: 'Lista de Usuarios' }} />} */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;