import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, } from 'react-native';
import { SearchBar, SpeedDial, Text, ListItem, Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { buscarPorConterNome } from '../../../../services/ClienteService';
import ModalCarregando from '../../../components/ModalCarregando';
import Selecionar from '../../estados/Selecionar';

const Listar = () => {

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const [retorno, setRetorno] = useState([]);

    const [valor, setValor] = useState(null);

    const [modalEstados, setModalEstados] = useState(false);

    const pesquisarClientes = async (nome) => {
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
                <ListItem.Title>{`Código: ${item.id}  - Nome : ${item.apelido_nome_fantazia}`}</ListItem.Title>
                <ListItem.Subtitle>{`Ativado: ${item.ativo ? 'Sim' : 'Não'}`}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Selecionar isVisible={modalEstados}
                onBackdropPress={() => setModalEstados(!modalEstados)} />
                */}
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
            <Button
                title="Estados"
                onPress={() => 
                    {
                        let teste = !modalEstados;
                        setModalEstados(teste);
                        console.log(teste);
                    }
                }
            />
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
                    onPress={() => navigation.navigate('CadastrarCliente')} />
            </SpeedDial>
            {carregando && <ModalCarregando pagina='Listar clientes' />}
        </SafeAreaView>
    )
}

export default Listar;