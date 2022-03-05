import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const list1 = [
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
        title: 'Vendas',
        icon: 'cart-plus',
        route: 'ResultadosVendas'
    },
];

const Resultatos = () => {

    const navigation = useNavigation();

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
                    data={list1}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </>
    )
}

export default Resultatos;