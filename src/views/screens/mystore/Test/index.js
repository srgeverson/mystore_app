import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Alert, View } from 'react-native';
import { Divider, SpeedDial, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Databese from '../../../../core/database';
import ModalCarregando from '../../../components/ModalCarregando';

const Listar = () => {
    const [open, setOpen] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [id, setId] = useState(0);
    const [retorno, setRetorno] = useState([]);

    const salvarUsuario = async () => {
        setCarregando(true);
        try {
            setId(id + 1);
            const usuarios = [];
            const usuario = {
                id: id,
                nome: 'Geverson',
                ativo: true
            }
            usuarios.push(usuario);
            const cadastro = await Databese.insertOrReplace(usuarios);
            console.log(`Cadsatrando...${JSON.stringify(cadastro)}`);
        } catch (error) {
            console.log(`Ocorreu erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const listarUsuario = async () => {
        setCarregando(true);
        try {
            const lista = await Databese.selectAll();
            console.log(`Listagem...${JSON.stringify(lista)}`);
            var temp = [];
            for (let i = 0; i < lista.rows.length; ++i) {
                //console.log(JSON.stringify(lista.rows.item(i)));
                temp.push(lista.rows.item(i));
            }
            for (let i = 0; i < temp.length; ++i) {
                console.log(JSON.stringify(temp[i]));
            }
            setRetorno(temp);
        } catch (error) {
            console.log(`Ocorreu no método listarUsuario erro em /src/viwes/mystore/Test -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        // if (retorno.length > 0)
        console.log(`Opa...${JSON.stringify(retorno)}`);
        // for (let i = 0; i < retorno.length; ++i)
    }, [])

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem key={item.id} style={{ height: 50 }}
            bottomDivider onPress={() => {
                // Alert.alert('Clique', `Objeto ${item.id} foi clicada!`)
            }}>
            <ListItem.Content>
                <ListItem.Title>{`ID: ${item.id}  - Nome :${item.nome}`}</ListItem.Title>
                <ListItem.Subtitle>{`ID: ${item.id}  - Nome :${item.nome}`}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <SafeAreaView style={{ flex: 1,  }}>
           <Divider
                orientation="horizontal"
                subHeader="INSERT"
                subHeaderStyle={{ color: 'blue' }} />
            <Icon name='user-plus' size={50} color='#8B97A3' onPress={() => {
                console.log(`Cadastrando...`);
                salvarUsuario();
            }} />
            <Divider
                orientation="horizontal"
                subHeader="SELECT"
                subHeaderStyle={{ color: 'blue' }} />
            <Icon name='list' size={50} color='#8B97A3' onPress={() => {
                console.log(`Listando...`);
                listarUsuario();
            }} />
    
          
                {
                    retorno.length > 0
                        ?
                    // <ScrollView>
                    //     </ScrollView>
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={retorno}
                            renderItem={renderItem}
                        />
                        // retorno.map((item, i) => {
                        //     return  <ListItem key={i} style={{height:50} } 
                        //             bottomDivider onPress={() => Alert.alert('Clique', `Objeto ${item.id} foi clicada!`)}>
                        //             <ListItem.Content>
                        //                 <ListItem.Title>{`ID: ${item.id}  - Nome :${item.nome}`}</ListItem.Title>
                        //                 <ListItem.Subtitle>{`ID: ${item.id}  - Nome :${item.nome}`}</ListItem.Subtitle>
                        //             </ListItem.Content>
                        //         </ListItem>
                        // })
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
            </SpeedDial>
            {carregando && <ModalCarregando pagina='Testes' />}
        </SafeAreaView>
    )
}

export default Listar;