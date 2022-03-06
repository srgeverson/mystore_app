import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const opcoesDeResultados = [
    {
        title: 'Clientes',
        icon: 'address-card',
        route: 'ResultadosClientes'
    },
    {
        title: 'Compras',
        icon: 'shopping-cart',
        route: 'ResultadosCompras'
    },
    {
        title: 'Produtos',
        icon: 'list',
        route: 'ResultadosProdutos'
    },
    {
        title: 'Vendas',
        icon: 'cart-plus',
        route: 'ResultadosVendas'
    },
];

const Resultatos = ({ navigation }) => {

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem key={item.id} style={{ height: 60 }}
            bottomDivider
            onPress={() => navigation.navigate(item.route)}>
            <Icon name={item.icon} size={20} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={opcoesDeResultados}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </>
    )
}

export default Resultatos;