import React, { useContext, useEffect, useState } from 'react';
// import theme from '../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthorityContext } from '../contexts';
import { rootEntryPoint } from '../../services/UsuarioService';
import HeaderLeft from '../../views/components/HeaderLeft';
import ModalCarregando from '../../views/components/ModalCarregando';
import HeaderRight from '../../views/components/HeaderRight';
import BemVindo from '../../views/screens/mystore/BemVindo';
import ListarClientes from '../../views/screens/clientes/Listar';
import ListarCompras from '../../views/screens/compras/Listar';
import ListarVendas from '../../views/screens/vendas/Listar';
import { ResultadosStackNavigator } from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerCustom = (props) => {

    const { signOut } = useContext(AuthorityContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {/* <DrawerItem label="Fechar" onPress={() => props.navigation.closeDrawer()} icon={() => <Icon name='close' size={20} color='#007bff' />} /> */}
            <DrawerItem label="Sair" onPress={() => signOut()} icon={() => <Icon name='sign-out' size={20} color='#007bff' />} />
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {
    const [carregando, setCarregando] = useState(false);

    const [menusDisponiveis, setMenusDisponiveis] = useState(null);

    const [offline, setOffLine] = useState(true);

    const getEndpoints = async () => {
        setCarregando(true);
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
        finally {
            setCarregando(false);
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

    const getScrens = (name, component, title, icone, headerShown = true) => {
        return (
            <Drawer.Screen name={name} component={component} options={{
                headerShown: headerShown, title: title, drawerIcon: (focused) => getIcones(icone, null, focused),
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#FFF' },
                headerLeft: () => <HeaderLeft />,
                headerRight: () => <HeaderRight carregando={carregando} offline={offline} />,
                headerStyle: { backgroundColor: '#1B8BD1', }
            }} />
        );
    }

    useEffect(() => {
        getEndpoints();
    }, []);

    return (
        <>
            <Drawer.Navigator drawerContent={props => <DrawerCustom {...props} />} initialRouteName='BemVindo'>
                {true && getScrens('BemVindo', BemVindo, 'Página Inicial', 'home')}
                {true && getScrens("ListarClientes", ListarClientes, 'Clientes', 'address-card')}
                {true && getScrens("ListarCompras", ListarCompras, 'Compras', 'shopping-cart')}
                {true && getScrens("ListarVendas", ListarVendas, 'Vendas', 'cart-plus')}
                {true && getScrens("Resultados", ResultadosStackNavigator, 'Resultados', 'bar-chart', false)}
            </Drawer.Navigator>
            {carregando && <ModalCarregando pagina='Configurando permissões' />}
        </>
    );
};

export default DrawerNavigator;