import React, { useState } from 'react';
import { SafeAreaView, } from 'react-native';
import { SearchBar, SpeedDial, Text, ListItem, Avatar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClienteRepository from '../../../../repository/ClienteRepository';
import { atualizarTudoPorIdLocal, buscarPorConterApelidoOuNome, buscarPorConterNome, buscarPorId, buscarPorItensNaoSinconizados, buscarPorItensNaoSincronizados, postClientes } from '../../../../services/ClienteService';
import { getLoginSalvo } from '../../../../services/UsuarioService';
import ModalCarregando from '../../../components/ModalCarregando';
import { extractorFirstLeterNames, keyExtractor } from '../../../components/Utils';

const Listar = ({ navigation }) => {

    const [open, setOpen] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const [retorno, setRetorno] = useState([]);

    const [valor, setValor] = useState(null);

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
                // navigation.navigate('ClientesCadastro', { id: item.id })
                //bc694d59-46e7-41f6-8016-0f28171d4f25
                // let teste = await buscarPorId(2);

                let clienteTep = {
                    apelidoNomeFantazia: null,
                    ativo: null,
                    celular: null,
                    cpfCnpj: null,
                    critica: null,
                    dataCadastro: null,
                    email: null,
                    empresasId: null,
                    enderecosId: null,
                    id: 1543,//1542,
                    idLocal: JSON.stringify("bc694d59-46e7-41f6-8016-0f28171d4f25"),
                    nomeRazaoSocial: 'Razao Teste1 UPDATE',
                    telefone: null,
                    versao: null
                };
             // await atualizarTudoPorIdLocal(clienteTep);
            }}>
            <Avatar rounded title={extractorFirstLeterNames(item.apelido_nome_fantazia)}
                containerStyle={{ backgroundColor: '#00a7f7' }}
            />
            <ListItem.Content>
                <ListItem.Title >
                    {`${item.apelido_nome_fantazia}`}
                </ListItem.Title>
                <ListItem.Subtitle >
                    {`${item.nome_razao_social}`}
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
                    <SpeedDial.Action
                        color='#007BFF'
                        icon={<Icon name='edit' size={20} color='#FFF' />}
                        title="Teste"
                        onPress={() => {
                            teste = async () => {
                                // const teste= await ClienteRepository.selectUltimaVersao();
                                //const teste= await CidadeRepository.selectUltimaVersao();
                                //const teste= await EstadoRepository.selectAll();

                                // if (teste.rows && teste.rows.item(0).versao != null)
                                //     console.log(teste.rows.item(0).versao);
                                // let teste1= await ClienteRepository.selectAll();
                                // console.log(teste1.rows.raw());
                                let teste = await buscarPorItensNaoSincronizados();
                                console.log(teste.rows.item(0));
                                
                                const { empresa, token } = await getLoginSalvo();
                                let teste1 = await postClientes(token, empresa, teste.rows.item(0));
                                console.log(teste1);
                            }
                            // navigation.navigate('ClientesCadastro', { id: 0 })
                            teste();
                        }} />
                </SpeedDial>
                {carregando && <ModalCarregando pagina='Listar clientes' />}
            </SafeAreaView>
        </>
    )
}

export default Listar;