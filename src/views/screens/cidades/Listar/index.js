import React, { useState } from 'react';
import { Alert, SafeAreaView, } from 'react-native';
import { ListItem, Avatar, SearchBar, SpeedDial } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Listar = () => {

    const [nomeCidade, setNomeCidade] = useState(null);

    const [open, setOpen] = useState(false);

    const cidades = [
        {
            nome: 'Caucaia',
            imagem: null,
            sigla: 'CAU'
        },
        {
            nome: 'Eusébio',
            imagem: null,
            sigla: 'EUS'
        },
        {
            nome: 'Fortaleza',
            imagem: null,
            sigla: 'FOR'
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                lightTheme={true}
                placeholder={`Digite o nome da cidade aqui...`}
                clearIcon={<Icon name='ban' size={20} color='#007bff' onPress={() => setNomeCidade(null)} />}
                searchIcon={<Icon name='search' size={20} color='#007bff' onPress={() => setNomeCidade(null)} />}
                onChangeText={value => setNomeCidade(value)}
                value={nomeCidade}
            />
            {cidades.map((objeto, codigo) => (
                <ListItem key={codigo} bottomDivider onPress={() => Alert.alert('Clique', `Cidade ${objeto.nome} foi clicada!`)}>
                    {objeto.imagem && <Avatar source={{ uri: objeto.imagem }} />}
                    <ListItem.Content>
                        <ListItem.Title>{objeto.nome}</ListItem.Title>
                        <ListItem.Subtitle>{objeto.sigla}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
            <SpeedDial
            color='#007bff'
                isOpen={open}
                icon={<Icon name='ellipsis-v' size={20} color='#FFF' onPress={() => setOpen(!open)} />}
                openIcon={<Icon name='close' size={20} color='#FFF' onPress={() => setOpen(!open)} />}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                color='#007bff'
                    icon={<Icon name='plus' size={20} color='#FFF' />}
                    title="Cadastrar"
                    onPress={() => Alert.alert('Clique', `Botão cadastrar foi acionado!`)}
                />
            </SpeedDial>
        </SafeAreaView>
    )
}

export default Listar;