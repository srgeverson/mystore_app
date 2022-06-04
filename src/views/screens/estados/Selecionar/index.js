import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { ListItem, SearchBar } from 'react-native-elements';
import { buscarPorConterNome } from '../../../../services/EstadoService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../assets/styles/theme';
import { ScrollView } from 'react-native';

const Selecionar = ({ setModal, setNome, setId, modalEstados }) => {

    const [carregando, setCarregando] = useState(false);

    const [estados, setEstados] = useState([]);

    const [nomeEstado] = useState(null);

    const pesquisarEstados = async (nome) => {
        try {
            setCarregando(true);
            const lista = await buscarPorConterNome(nome);
            setEstados(lista.rows.raw());
        } catch (error) {
            console.log(`Ocorreu no método pesquisarEstados erro em /src/viwes/estados/Selecionar -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <Dialog overlayStyle={{ marginTop: 100 }} isVisible={modalEstados} onBackdropPress={() => setModal(!modalEstados)}>
                <Dialog.Title title='Estados' />
                <SearchBar
                    lightTheme={true}
                    placeholder={`Digite o nome do estado`}
                    onChangeText={value => pesquisarEstados(value)}
                    value={nomeEstado}
                    searchIcon={carregando && <Icon
                        name="spinner"
                        size={theme.sizes.icon}
                        color={theme.colors.light}
                        style={{ marginRight: theme.margins.iconTextRight }} />}
                />
                <ScrollView>
                    {
                        estados.map((estado, i) => (
                            <ListItem
                                key={estado.id.toString()}
                                bottomDivider
                                onPress={() => {
                                    setId(estado.id);
                                    setNome(estado.nome);
                                    setModal(false);
                                }}>
                                <ListItem.Content>
                                    <ListItem.Title>{`${estado.nome}`}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </Dialog>
        </>
    )
}

export default Selecionar;