import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import { Dialog, Divider, Input, ListItem, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { cadastrar } from '../../../../services/ClienteService';
import { buscarPorConterNome as buscarPorConterNomeCidade } from '../../../../services/CidadeService';
import { buscarPorConterNome as buscarPorConterNomeEstado } from '../../../../services/EstadoService';
import BotaoCancelar from '../../../components/BotaoCancelar';
import BotaoAlterar from '../../../components/BotaoAlterar';
import { createGuid } from '../../../components/Utils';

const Cadastro = ({ route, navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [idCliente] = useState(null);
  const [nomeRazaoSocial, setNomeRazaoSocial] = useState('null');
  const [apelidoNomeFantazia, setApelidoNomeFantazia] = useState('null');
  const [cpfCnpj, setCpfCnpj] = useState('null');
  const [celular, setCelular] = useState('null');
  const [telefone, setTelefone] = useState('null');
  const [email, setEmail] = useState('null');
  const [logradouro, setLogradouro] = useState('null');
  const [numero, setNnumero] = useState('null');
  const [complemento, setComplemento] = useState('null');
  const [bairro, setBairro] = useState('null');
  const [cep, setCep] = useState('null');
  const [estadoId, setEstadoId] = useState('null');
  const [estado, setEstado] = useState('null');
  const [estados, setEstados] = useState([]);
  const [modalEstados, setModalEstados] = useState(false);
  const [cidadeId, setCidadeId] = useState('null');
  const [cidade, setCidade] = useState('null');
  const [modalCidades, setModalCidades] = useState(false);
  const [cidades, setCidades] = useState([]);

  const pesquisarEstados = async (nome) => {
    setCarregando(true);
    try {
      const lista = await buscarPorConterNomeEstado(nome);
      setEstados(lista.rows.raw());
    } catch (error) {
      console.log(`Ocorreu no método pesquisarEstados erro em /src/viwes/estados/Listar -> ${new Date()} -> erro: ${error}`);
    } finally {
      setCarregando(false);
    }
  }

  const pesquisarCidades = async (nome) => {
    setCarregando(true);
    try {
      const lista = await buscarPorConterNomeCidade(nome, estadoId);
      setCidades(lista.rows.raw());
    } catch (error) {
      console.log(`Ocorreu no método pesquisarCidades erro em /src/viwes/estados/Listar -> ${new Date()} -> erro: ${error}`);
    } finally {
      setCarregando(false);
    }
  }

  const salvarCliente = () => {
    const guid = createGuid();
    let cliente = {
      idLocal: guid,
      nomeRazaoSocial,
      apelidoNomeFantazia,
      cpfCnpj,
      celular,
      telefone,
      email,
      endereco: {
        idEndereco: guid,
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidade: { id: cidadeId }
      }
    };
    cadastrar(cliente);
    console.log('Salvando cliente em 1s...' + JSON.stringify(cliente));
  }

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <ScrollView>
        {route.params && <Input label='Código do Cliente' editable={false} value={route.params.id.toString()} />}

        <Input
          errorMessage={!nomeRazaoSocial && 'Nome/Razão Social é obrigatório.'}
          label='Nome/Razão Social'
          rightIcon={<Icon name='close' size={20} onPress={() => setNomeRazaoSocial(null)} />}
          onChangeText={value => setNomeRazaoSocial(value)}
          //placeholder='Enter Name'
          value={nomeRazaoSocial}
        />

        <Input
          errorMessage={!apelidoNomeFantazia && 'Apelido/Nome Fantazia é obrigatório.'}
          label='Apelido/Nome Fantazia'
          rightIcon={<Icon name='close' size={20} onPress={() => setApelidoNomeFantazia(null)} />}
          onChangeText={value => setApelidoNomeFantazia(value)}
          //placeholder='Enter Name'
          value={apelidoNomeFantazia}
        />
        <Input
          errorMessage={!cpfCnpj && 'CPF/CNPJ é obrigatório.'}
          label='CPF/CNPJ'
          rightIcon={<Icon name='close' size={20} onPress={() => setCpfCnpj(null)} />}
          onChangeText={value => setCpfCnpj(value)}
          //placeholder='Enter Name'
          value={cpfCnpj}
        />
        <Input
          errorMessage={!celular && 'Celular é obrigatório.'}
          label='Celular'
          rightIcon={<Icon name='close' size={20} onPress={() => setCelular(null)} />}
          onChangeText={value => setCelular(value)}
          //placeholder='Enter Name'
          value={celular}
        />
        <Input
          errorMessage={!telefone && 'Telefone é obrigatório.'}
          label='Telefone'
          rightIcon={<Icon name='close' size={20} onPress={() => setTelefone(null)} />}
          onChangeText={value => setTelefone(value)}
          //placeholder='Enter Name'
          value={telefone}
        />
        <Input
          errorMessage={!email && 'E-mail é obrigatório.'}
          label='E-mail'
          rightIcon={<Icon name='close' size={20} onPress={() => setEmail(null)} />}
          onChangeText={value => setEmail(value)}
          //placeholder='Enter Name'
          value={email}
        />
        <Divider style={{ marginTop: 20 }} />
        <Input
          errorMessage={!logradouro && 'Rua/Av. é obrigatório.'}
          label='Rua/Av.'
          rightIcon={<Icon name='close' size={20} onPress={() => setLogradouro(null)} />}
          onChangeText={value => setLogradouro(value)}
          //placeholder='Enter Name'
          value={logradouro}
        />
        <Input
          errorMessage={!numero && 'Número é obrigatório.'}
          label='Número'
          rightIcon={<Icon name='close' size={20} onPress={() => setNnumero(null)} />}
          onChangeText={value => setNnumero(value)}
          //placeholder='Enter Name'
          value={numero}
        />
        <Input
          // errorMessage='Oops! that's not correct.'
          label='Complemento'
          rightIcon={<Icon name='close' size={20} onPress={() => setComplemento(null)} />}
          onChangeText={value => setComplemento(value)}
          //placeholder='Enter Name'
          value={complemento}
        />
        <Input
          errorMessage={!bairro && 'Bairro é obrigatório.'}
          label='Bairro'
          rightIcon={<Icon name='close' size={20} onPress={() => setBairro(null)} />}
          onChangeText={value => setBairro(value)}
          //placeholder='Enter Name'
          value={bairro}
        />
        <Input
          // errorMessage='Oops! that's not correct.'
          label='CEP'
          rightIcon={<Icon name='close' size={20} onPress={() => setCep(null)} />}
          onChangeText={value => setCep(value)}
          //placeholder='Enter Name'
          value={cep}
        />
        {/* begin estados */}
        <Input
          errorMessage={!estado && 'Selecione uma UF.'}
          label='Estado'
          leftIcon={<Icon name='search' size={20} onPress={() => setModalEstados(!modalEstados)} />}
          rightIcon={<Icon name='close' size={20} onPress={() => {
            setEstado(null);
            setEstadoId(0);
            setCidadeId(null);
            setCidade(null);
          }} />}
          placeholder='Pesquise e selecione um estado'
          value={estado}
        />
        <Dialog overlayStyle={{ marginTop: 100 }} isVisible={modalEstados} onBackdropPress={() => setModalEstados(!modalEstados)}>
          <Dialog.Title title='Estados' />
          <SearchBar
            lightTheme={true}
            placeholder={`Digite o nome do estado`}
            onChangeText={value => pesquisarEstados(value)}
            value={estado}
          />
          <ScrollView>
            {estados.map((item, i) => (
              <ListItem key={item.id.toString()} bottomDivider
                onPress={() => {
                  setEstadoId(item.id);
                  setEstado(item.nome);
                  //Reset da cidade
                  setCidadeId(null);
                  setCidade(null);
                  setModalEstados(!modalEstados);
                }}>
                <ListItem.Content>
                  <ListItem.Title>{`${item.nome}`}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </Dialog>
        {/* end estados */}
        {/* begin cidades */}
        <Input
          errorMessage={!cidade && 'Selecione uma cidade!'}
          label='Cidade'
          leftIcon={<Icon name='search' size={20} onPress={() => {
            if (estado != null)
              setModalCidades(!modalCidades);
            else
              Alert.alert(`Selecione primeiro o estado!`);
          }} />}
          rightIcon={<Icon name='close' size={20} onPress={() => {
            setCidadeId(null);
            setCidade(null);
          }} />}
          placeholder='Pesquise e selecione uma cidade'
          value={cidade}
        />
        <Dialog
          overlayStyle={{ marginTop: 100 }}
          isVisible={modalCidades} onBackdropPress={() => setModalCidades(!modalCidades)}>
          <Dialog.Title title='Cidades' />
          <SearchBar
            lightTheme={true}
            placeholder={`Digite o nome do cidade`}
            onChangeText={value => pesquisarCidades(value)}
            value={cidade}
          />
          <ScrollView>
            {cidades.map((item, i) => (
              <ListItem key={item.id.toString()} bottomDivider
                onPress={() => {
                  setCidadeId(item.id);
                  setCidade(item.nome);
                  setModalCidades(!modalCidades);
                }}>
                <ListItem.Content>
                  <ListItem.Title>{`${item.nome}`}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </Dialog>
        {/* end cidades */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
          <BotaoCancelar carregando={carregando} titulo='Cancelar' pressionado={() => navigation.goBack()} desabilitado={false} />
          <BotaoAlterar carregando={carregando} titulo={route.params ? 'Alterar' : 'Salvar'} pressionado={salvarCliente} desabilitado={
             //idCliente: guid,
            !nomeRazaoSocial ||
            !apelidoNomeFantazia ||
            !cpfCnpj ||
            !celular ||
            !telefone ||
            !email ||
            // endereco: {
            //      idEndereco: guid,
            !logradouro ||
            !numero ||
            !complemento ||
            !bairro ||
            !cep ||
            //cidade: { id: 
            !cidade
            //}
            //  }
          } />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;