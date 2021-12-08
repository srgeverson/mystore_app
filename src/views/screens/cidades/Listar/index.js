import React, { useState } from 'react';
import { Alert, SafeAreaView, } from 'react-native';
import { ListItem, Avatar, SearchBar, SpeedDial, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCidades } from '../../../../services/CidadeService';
import ModalCarregando from '../../../components/ModalCarregando';

const Listar = () => {

    const [nomeCidade, setNomeCidade] = useState(null);

    const [open, setOpen] = useState(false);

    const [cidades, setCidades] = useState([]);

    const [carregando, setCarregando] = useState(false);

    // const cidades = [
    //     {
    //         nome: 'Caucaia',
    //         imagem: null,
    //         sigla: 'CAU'
    //     },
    //     {
    //         nome: 'Eusébio',
    //         imagem: null,
    //         sigla: 'EUS'
    //     },
    //     {
    //         nome: 'Fortaleza',
    //         imagem: null,
    //         sigla: 'FOR'
    //     },
    // ]

    const pesquisarCidades = async () => {
        try {
            setCarregando(true);
            var retorno = await getCidades(nomeCidade);
            if (retorno._embedded.cidades)
                setCidades(retorno._embedded.cidades);

        } catch (error) {
            console.log(`Ocorreu erro em /src/viwes/cidades/Listar -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
                lightTheme={true}
                placeholder={`Digite o nome da cidade aqui...`}
                searchIcon={<Icon name='search' size={20} color='#8B97A3' onPress={() => pesquisarCidades()} />}
                clearIcon={<Icon name='close' size={20} color='#8B97A3' onPress={() => setNomeCidade(null)} />}
                onChangeText={value => setNomeCidade(value)}
                value={nomeCidade} />
            {
                cidades.length > 0
                    ?
                    cidades.map((objeto, codigo) => (
                        <ListItem key={codigo} bottomDivider onPress={() => Alert.alert('Clique', `Cidade ${objeto.nome} foi clicada!`)}>
                            {objeto.imagem && <Avatar source={{ uri: objeto.imagem }} />}
                            <ListItem.Content>
                                <ListItem.Title>{objeto.nome}</ListItem.Title>
                                <ListItem.Subtitle>{objeto.sigla}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                    :
                    <Text>Listagem vazia...</Text>
            }
            <SpeedDial
                color='#007BFF'
                isOpen={open}
                icon={<Icon name='ellipsis-v' size={20} color='#FFF' onPress={() => setOpen(!open)} />}
                openIcon={<Icon name='close' size={20} color='#FFF' onPress={() => setOpen(!open)} />}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='plus' size={20} color='#FFF' />}
                    title="Cadastrar"
                    onPress={() => Alert.alert('Clique', `Botão cadastrar foi acionado!`)} />
            </SpeedDial>
            {carregando && <ModalCarregando pagina='Listar cidades' />}
        </SafeAreaView>
    )
}

export default Listar;