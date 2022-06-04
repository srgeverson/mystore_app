import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { ListItem, SearchBar } from 'react-native-elements';
import { buscarPorConterNome } from '../../../../services/CidadeService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../assets/styles/theme';
import { Alert, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

const Selecionar = ({ estadoId, modal, nome, setId, setModal, setNome }) => {

    const [carregando, setCarregando] = useState(false);

    const [cidades, setCidades] = useState([]);

    const [nomeCidade] = useState(null);

    const pesquisarCidades = async (nome) => {
        if (nome) {
            try {
                setCarregando(true);
                console.log(`${nome} - ${estadoId}`)
                const lista = await buscarPorConterNome(nome, estadoId);
                setCidades(lista.rows.raw());
            } catch (error) {
                console.log(`Ocorreu no método pesquisarCidades erro em /src/viwes/cidades/Selecionar -> ${new Date()} -> erro: ${error}`);
            } finally {
                setCarregando(false);
            }
        }
    }

    return (
        <>
            <Input
                errorMessage={!nome && 'Selecione uma cidade!'}
                label='Cidade'
                leftIcon={<Icon name='search' size={20} onPress={() => {
                    if (estadoId != null)
                        setModal(!modal);
                    else
                        Alert.alert(`Atenção`, `Selecione primeiro o estado!`);
                }} />}
                rightIcon={<Icon name='close' size={20} onPress={() => {
                    setId(null);
                    setNome(null);
                }} />}
                placeholder='Pesquise e selecione uma cidade'
                value={nome}
            />
            <Dialog overlayStyle={{ marginTop: theme.margins.selecionarMarginTop }} isVisible={modal} onBackdropPress={() => setModal(!modal)}>
                <Dialog.Title title='Cidades' />
                <SearchBar
                    lightTheme={true}
                    placeholder={`Digite o nome da cidade`}
                    onChangeText={value => pesquisarCidades(value)}
                    value={nomeCidade}
                    searchIcon={carregando && <Icon
                        name="spinner"
                        size={theme.sizes.icon}
                        color={theme.colors.light}
                        style={{ marginRight: theme.margins.iconTextRight }} />}
                />
                <ScrollView>
                    {
                        cidades.map((cidade, i) => (
                            <ListItem
                                key={cidade.id.toString()}
                                bottomDivider
                                onPress={() => {
                                    setId(cidade.id);
                                    setNome(cidade.nome);
                                    setModal(false);
                                }}>
                                <ListItem.Content>
                                    <ListItem.Title>{`${cidade.nome}`}</ListItem.Title>
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