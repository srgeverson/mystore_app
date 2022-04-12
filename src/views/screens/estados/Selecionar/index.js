import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { ListItem, SearchBar, Text } from 'react-native-elements';
import { buscarPorConterNome } from '../../../../services/EstadoService';
import { theme } from '../../../../assets/styles/theme';
import { ActivityIndicator } from 'react-native';

const Selecionar = (props) => {
    const [open, setOpen] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const [retorno, setRetorno] = useState([]);

    const [valor, setValor] = useState(null);

    const pesquisarEstados =async (nome) => {
        setCarregando(true);
        try {
            const lista = await buscarPorConterNome(nome);
            console.log(`Pesquisando...${JSON.stringify(lista)}`);
            var temp = [];
            for (let i = 0; i < lista.rows.length; ++i) {
                temp.push(lista.rows.item(i));
            }
            setRetorno(temp);
        } catch (error) {
            console.log(`Ocorreu no método pesquisarClientes erro em /src/viwes/clientes/Listar -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }
    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem key={item.id} style={{ height: 50 }}
            bottomDivider onPress={() => {
                Alert.alert('Clique', `Objeto ${JSON.stringify(item)} foi clicada!`)
            }}>
            <ListItem.Content>
                <ListItem.Title>{`Código: ${item.id}  - Nome : ${item.nome}`}</ListItem.Title>
                <ListItem.Subtitle>{`Ativado: ${item.ativo ? 'Sim' : 'Não'}`}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

        return (
            <>
                <Dialog
                    isVisible={props.isVisible}
                    onBackdropPress={props.onBackdropPress}
                >
                    <Dialog.Title title="Selecione UF" />
                    <SearchBar
                        lightTheme={true}
                        placeholder={`Digite o nome do estado`}
                        onChangeText={value => pesquisarEstados(value)}
                        value={valor}
                    />
                    {
                        carregando
                            ?
                            <ActivityIndicator size={theme.sizes.search} color={theme.colors.info} />
                            :
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
                    {/* {userlist.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={{
                            marginHorizontal: -10,
                            borderRadius: 8,
                        }}
                        onPress={toggleDialog6}
                    >
                        <Avatar rounded source={{ uri: l.avatar_url }} />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: '700' }}>
                                {l.name}
                            </ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))} */}
                </Dialog>
            </>
        )
}

export default Selecionar;