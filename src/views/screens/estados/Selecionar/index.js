import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { ListItem, SearchBar } from 'react-native-elements';
import { buscarPorConterNome } from '../../../../services/EstadoService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../assets/styles/theme';
import { ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

const Selecionar = ({ setId, modal, nome, setModal, setNome }) => {

    const [carregando, setCarregando] = useState(false);

    const [estados, setEstados] = useState([]);

    const [nomeEstado] = useState(null);

    const pesquisarEstados = async (nome) => {
        if (nome) {
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
    }

    return (
        <>
            <Input
                errorMessage={!nome && 'Selecione uma UF.'}
                label='Estado'
                leftIcon={<Icon name='search' size={20} onPress={() => setModal(!modal)} />}
                rightIcon={<Icon name='close' size={20} onPress={() => {
                    setNome(null);
                    setId(null);
                }} />}
                placeholder='Pesquise e selecione um estado'
                value={nome}
            />
            <Dialog overlayStyle={{ marginTop: theme.margins.selecionarMarginTop }} isVisible={modal} onBackdropPress={() => setModal(!modal)}>
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