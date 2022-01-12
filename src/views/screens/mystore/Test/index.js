import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Alert, } from 'react-native';
import { SpeedDial, ListItem, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Databese from '../../../../core/database';
import ModalCarregando from '../../../components/ModalCarregando';
import { apagarPorId, atualizar, buscarPorConterNome, buscarTodos, cadastrar, teste } from '../../../../services/UsuarioService';
import { testeURLExterna } from '../../../../core/api';

const Listar = () => {
    const [open, setOpen] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [id, setId] = useState(0);
    const [retorno, setRetorno] = useState([]);

    const salvarUsuario = async () => {
        setCarregando(true);
        try {
            setId(id);
            const usuario = {
                id: id,
                nome: 'Geverson Souza',
                ativo: true
            }
            const cadastro = await cadastrar(usuario);
            console.log(`Cadsatrando...${JSON.stringify(cadastro)}`);
        } catch (error) {
            console.log(`Ocorreu erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const atualizarUsuario = async () => {
        setCarregando(true);
        try {
            const usuario = {
                id: 5,
                nome: 'Geverson update',
                ativo: false
            }
            const cadastro = await atualizar(usuario);
            console.log(`Atualizando...${JSON.stringify(cadastro)}`);
        } catch (error) {
            console.log(`Ocorreu erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const listarUsuario = async () => {
        setCarregando(true);
        try {
            const lista = await buscarTodos();
            console.log(`Listagem...${JSON.stringify(lista)}`);
            var temp = [];
            for (let i = 0; i < lista.rows.length; ++i) {
                temp.push(lista.rows.item(i));
                // console.log(JSON.stringify(lista.rows.item(i)));
            }
            setRetorno(temp);
        } catch (error) {
            console.log(`Ocorreu no método listarUsuario erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const pesquisarUsuario = async (nome) => {
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
            console.log(`Ocorreu no método listarUsuario erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const deletearUsuario = async (id) => {
        setCarregando(true);
        try {
            const remove = await apagarPorId(id);
            console.log(`Deletando...${JSON.stringify(remove)}`);
        } catch (error) {
            console.log(`Ocorreu no método deletearUsuario erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        // if (retorno.length > 0)
        // console.log(`Opa...${JSON.stringify(retorno)}`);
        // for (let i = 0; i < retorno.length; ++i)
        //console.log(valor);
    }, [])

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem key={item.id} style={{ height: 50 }}
            bottomDivider onPress={() => {
                Alert.alert('Clique', `Objeto ${item.accessToken} foi clicada!`)
            }}>
            <ListItem.Content>
                <ListItem.Title>{`Código: ${item.id}  - Nome : ${item.nome}`}</ListItem.Title>
                <ListItem.Subtitle>{`Ativado: ${item.ativo ? 'Sim' : 'Não'}`}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    const [valor, setValor] = useState(null);

    const testeURL = async () => {
        await testeURLExterna()
        //.get(`/users/srgeverson`)
        .get("")
        .then((success) => { console.console.log("Sucesso!!!"+JSON.stringify(success)); })
        .catch((error) => { console.log('Erro!!! '+JSON.stringify(error)) })
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <SearchBar
                lightTheme={true}
                placeholder={`Digite o nome da cidade aqui...`}
                onChangeText={value => pesquisarUsuario(value)}
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
                    icon={<Icon name='folder-open' size={20} color='#FFF' />}
                    title="Abrir conexão"
                    onPress={() => console.log(`Abrindo...`)} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='cogs' size={20} color='#FFF' />}
                    title="Criar banco"
                    onPress={() => {
                        console.log(`Inicializando...`);
                        const teste = Databese.initDB();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='ban' size={20} color='#FFF' />}
                    title="Fechar conexão"
                    onPress={() => {
                        console.log(`Fechando...`);
                        Databese.closeDatabase();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='trash' size={20} color='#FFF' />}
                    title="Remover banco"
                    onPress={() => {
                        console.log(`Apagando...`);
                        Databese.dropDatabase();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='user-plus' size={20} color='#FFF' />}
                    title="Cadastrar"
                    onPress={() => {
                        console.log(`Cadastrando...`);
                        salvarUsuario();
                        // teste({
                        //     accessToken: 'token teste',
                        //     data: new Date(),
                        //     expiresIn: 0,
                        //     id: -1,
                        //     jti: 'jti',
                        //     nome: 'geverson',
                        //     tokenType: 'tipo token',
                        //     scope: 'escopo',
                        // });
                        console.log(`Listando...`);
                        listarUsuario();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='list-ol' size={20} color='#FFF' />}
                    title="Listar"
                    onPress={() => {
                        console.log(`Listando...`);
                        listarUsuario();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='user-times' size={20} color='#FFF' />}
                    title="Apagar"
                    onPress={() => {
                        console.log(`Apagando...`);
                        deletearUsuario(0);
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='refresh' size={20} color='#FFF' />}
                    title="Atualizar"
                    onPress={() => {
                        console.log(`Atualizando...`);
                        atualizarUsuario();
                    }} />
                <SpeedDial.Action
                    color='#007BFF'
                    icon={<Icon name='adjust' size={20} color='#FFF' />}
                    title="Teste URL externa"
                    onPress={() => {
                        console.log(`Testando URL externa...`);
                        testeURL();
                    }} />
            </SpeedDial>
            {carregando && <ModalCarregando pagina='Testes' />}
        </SafeAreaView>
    )
}

export default Listar;