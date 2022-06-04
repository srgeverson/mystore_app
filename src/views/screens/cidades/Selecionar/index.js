import React, { useState } from 'react';
import { Dialog } from '@rneui/themed';
import { ListItem, SearchBar } from 'react-native-elements';
import { buscarPorConterNome } from '../../../../services/CidadeService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../assets/styles/theme';
import { ScrollView } from 'react-native';

const Selecionar = ({ setModal, setNome, setId, modalCidades, estadoId }) => {

    const [carregando, setCarregando] = useState(false);

    const [cidades, setCidades] = useState([]);

    const [nomeCidade] = useState(null);

    const pesquisarCidades = async (nome) => {
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

    return (
        <>
            <Dialog overlayStyle={{ marginTop: 100 }} isVisible={modalCidades} onBackdropPress={() => setModal(!modalCidades)}>
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