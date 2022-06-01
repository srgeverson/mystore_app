import React, { useState } from 'react';
import { SafeAreaView, } from 'react-native';
import { SearchBar, SpeedDial, Text, ListItem, Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { buscarPorConterApelidoOuNome } from '../../../../services/ClienteService';
import ModalCarregando from '../../../components/ModalCarregando';
import { extractorFirstLeterNames, keyExtractor } from '../../../../core/Utils';

const Listar = ({ navigation }) => {

    const [open, setOpen] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const [retorno, setRetorno] = useState([]);

    const [valor] = useState(null);

    const pesquisarClientes = async (nome) => {
        setCarregando(true);
        try {
            if (nome) {
                const lista = await buscarPorConterApelidoOuNome(nome);
                setRetorno(lista.rows.raw());
            }
        } catch (error) {
            console.log(`Ocorreu no método pesquisarClientes erro em /src/viwes/clientes/Listar -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const renderItem = ({ item }) => (
        <ListItem
            onPress={async () => {
                navigation.navigate('ClientesCadastro', {
                    id: item.versao ? item.id : null,
                    idLocal: item.versao ? item.id : item.idLocal
                });
            }}>
            <Avatar rounded title={extractorFirstLeterNames(item.apelidoNomeFantazia)}
                containerStyle={{ backgroundColor: '#00a7f7' }}
            />
            <ListItem.Content>
                <ListItem.Title >
                    {`${item.apelidoNomeFantazia}`}
                </ListItem.Title>
                <ListItem.Subtitle >
                    {`${item.nomeRazaoSocial}`}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem>
    );

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar
                    lightTheme={true}
                    placeholder={`Digite o nome da Cliente aqui...`}
                    onChangeText={value => pesquisarClientes(value)}
                    value={valor} />
                {
                    retorno.length > 0
                        ?
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={retorno}
                            renderItem={renderItem}
                        />
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
                        onPress={() => navigation.navigate('ClientesCadastro')} />
                </SpeedDial>

                {carregando && <ModalCarregando pagina='Listar clientes' />}
            </SafeAreaView>
        </>
    )
}

export default Listar;