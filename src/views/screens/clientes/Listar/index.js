import React, { useState } from 'react';
import { Alert, SafeAreaView, } from 'react-native';
import { SearchBar, SpeedDial, Text, ListItem, Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CidadeRepository from '../../../../repository/CidadeRepository';
import ClienteRepository from '../../../../repository/ClienteRepository';
import EstadoRepository from '../../../../repository/EstadoRepository';
import { buscarPorConterNome } from '../../../../services/ClienteService';
import ModalCarregando from '../../../components/ModalCarregando';

const Listar = ({navigation}) => {

    const [open, setOpen] = useState(false);

    const [carregando, setCarregando] = useState(false);

    const [retorno, setRetorno] = useState([]);

    const [valor, setValor] = useState(null);

    const pesquisarClientes = async (nome) => {
        setCarregando(true);
        try {
            if (nome) {
                const lista = await buscarPorConterNome(nome);
                console.log(`Pesquisando...${JSON.stringify(lista)}`);
                setRetorno(lista.rows.raw());
            }
        } catch (error) {
            console.log(`Ocorreu no método pesquisarClientes erro em /src/viwes/clientes/Listar -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem key={item.id} style={{ height: 50 }}
            bottomDivider onPress={() => navigation.navigate('ClientesCadastro', { id: item.id })}>
            <ListItem.Content>
                <ListItem.Title>{`Código: ${item.id}  - Nome : ${item.apelido_nome_fantazia}`}</ListItem.Title>
                <ListItem.Subtitle>{`Ativado: ${item.ativo ? 'Sim' : 'Não'}`}</ListItem.Subtitle>
            </ListItem.Content>
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
                         teste=async()=>{
                            // const teste= await ClienteRepository.selectUltimaVersao();
                            const teste= await CidadeRepository.selectUltimaVersao();
                            //const teste= await EstadoRepository.selectAll();
                            
                            if (teste.rows && teste.rows.item(0).versao != null)
                                console.log(teste.rows.item(0).versao);
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