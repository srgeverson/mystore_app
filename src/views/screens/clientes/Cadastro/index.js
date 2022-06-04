import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { atualizarTudoPorIdLocal, buscarPorIdLocal, cadastrar } from '../../../../services/ClienteService';
import BotaoCancelar from '../../../components/BotaoCancelar';
import BotaoAlterar from '../../../components/BotaoAlterar';
import { createGuid } from '../../../../core/Utils';
import CampoTexto from '../../../components/CampoTexto';
import CampoTelefone from '../../../components/CampoTelefone';
import CampoCelular from '../../../components/CampoCelular';
import CampoCEP from '../../../components/CampoCEP';
import CampoCpfOuCnpj from '../../../components/CampoCpfOuCnpj';
import SelecionarEstado from '../../estados/Selecionar';
import SelecionarCidade from '../../cidades/Selecionar';
import { theme } from '../../../../assets/styles/theme';

const Cadastro = ({ route, navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [idCliente, setIdCliente] = useState(null);
  const [idLocal, setIdLocal] = useState(null);
  const [nomeRazaoSocial, setNomeRazaoSocial] = useState(null);
  const [apelidoNomeFantazia, setApelidoNomeFantazia] = useState(null);
  const [cpfCnpj, setCpfCnpj] = useState(null);
  const [celular, setCelular] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [email, setEmail] = useState(null);
  const [logradouro, setLogradouro] = useState(null);
  const [numero, setNumero] = useState(null);
  const [complemento, setComplemento] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cep, setCep] = useState(null);
  const [estadoId, setEstadoId] = useState(null);
  const [estado, setEstado] = useState(null);
  const [modalEstados, setModalEstados] = useState(false);
  const [cidadeId, setCidadeId] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [modalCidades, setModalCidades] = useState(false);

  const salvarCliente = () => {
    const guid = createGuid();
    let clienteTMP = {
      idLocal: idLocal ? idLocal : guid,
      nomeRazaoSocial,
      apelidoNomeFantazia,
      cpfCnpj,
      celular,
      telefone,
      email,
      endereco: {
        idEndereco: idLocal ? idLocal : guid,
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidade: { id: cidadeId }
      }
    };
    if (idLocal)
      atualizarTudoPorIdLocal(clienteTMP);
    else
      cadastrar(clienteTMP);
  }

  useEffect(() => {
    if (route.params && route.params.idLocal) {
      setIdLocal(route.params.idLocal);
      pesquisarClientePorIdLocal(route.params.idLocal);
    }
    if (route.params && route.params.id)
      setIdCliente(route.params.id);
  }, [])

  const pesquisarClientePorIdLocal = async (idLocal) => {
    setCarregando(true);
    try {
      const lista = await buscarPorIdLocal(idLocal);
      const clienteDBLocal = lista.rows.item(0);

      console.log(clienteDBLocal);
      if (clienteDBLocal) {
        setIdCliente(clienteDBLocal.id);
        setIdLocal(clienteDBLocal.idLocal);
        setNomeRazaoSocial(clienteDBLocal.nomeRazaoSocial);
        setApelidoNomeFantazia(clienteDBLocal.apelidoNomeFantazia);
        setCpfCnpj(clienteDBLocal.cpfCnpj);
        setCelular(clienteDBLocal.celular);
        setTelefone(clienteDBLocal.telefone);
        setEmail(clienteDBLocal.email);
        setLogradouro(clienteDBLocal.logradouro);
        setNumero(clienteDBLocal.numero);
        setComplemento(clienteDBLocal.complemento);
        setBairro(clienteDBLocal.bairro);
        setCep(clienteDBLocal.cep);
        setEstadoId(clienteDBLocal.estadoId);
        setCidadeId(clienteDBLocal.cidadeId);
      }
    } catch (error) {
      console.log(`Ocorreu no método pesquisarClientePorIdLocal erro em /src/viwes/cidades/Cadastro -> ${new Date()} -> erro: ${error}`);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={theme.containners.formCrudDefault}>
      <ScrollView>
        {route.params && route.params.id ? <Input label='Código do Cliente' editable={false} value={route.params.id.toString()} /> : false && route.params && route.params.idLocal && Alert.alert('Dados Sincronizando', 'Os dados deste cliente não foram sincronizado com o servidor!')}

        <CampoTexto
          //mensagemDeErro='Nome/Razão Social é obrigatório.'
          //nomeDoCampo='Nome/Razão Social'
          descricaoDoCampo='Nome/Razão Social'
          valor={nomeRazaoSocial}
          setValor={setNomeRazaoSocial} />

        <CampoTexto
          //mensagemDeErro='Apelido/Nome Fantazia é obrigatório.'
          //nomeDoCampo='Apelido/Nome Fantazia'
          descricaoDoCampo='Apelido/Nome Fantazia'
          valor={apelidoNomeFantazia}
          setValor={setApelidoNomeFantazia} />

        <CampoCpfOuCnpj
          //mensagemDeErro='CPF/CNPJ é obrigatório.'
          //nomeDoCampo='CPF/CNPJ'
          descricaoDoCampo='CPF/CNPJ'
          valor={cpfCnpj}
          setValor={setCpfCnpj} />

        <CampoCelular
          //mensagemDeErro='Celular é obrigatório.'
          //nomeDoCampo='Celular'
          descricaoDoCampo='Celular'
          valor={celular}
          setValor={setCelular} />

        <CampoTelefone
          //mensagemDeErro='Telefone é obrigatório.'
          //nomeDoCampo='Telefone'
          descricaoDoCampo='Telefone'
          valor={telefone}
          setValor={setTelefone} />

        <CampoTexto
          //mensagemDeErro='E-mail é obrigatório.'
          //nomeDoCampo='E-mail'
          descricaoDoCampo='E-mail'
          valor={email}
          setValor={setEmail} />

        <CampoTexto
          //mensagemDeErro='Rua/Av. é obrigatório.'
          //nomeDoCampo='Rua/Av.'
          descricaoDoCampo='Rua/Av.'
          valor={logradouro}
          setValor={setLogradouro} />

        <CampoTexto
          //mensagemDeErro='Número é obrigatório.'
          //nomeDoCampo='Número'
          descricaoDoCampo='Número'
          valor={numero}
          setValor={setNumero} />

        <CampoTexto
          //mensagemDeErro='Complemento é obrigatório.'
          //nomeDoCampo='Complemento'
          descricaoDoCampo='Complemento'
          valor={complemento}
          setValor={setComplemento} />

        <CampoTexto
          //mensagemDeErro='Bairro é obrigatório.'
          //nomeDoCampo='Bairro'
          descricaoDoCampo='Bairro'
          valor={bairro}
          setValor={setBairro} />

        <CampoCEP
          //mensagemDeErro='CEP é obrigatório.'
          //nomeDoCampo='CEP'
          descricaoDoCampo='CEP'
          valor={cep}
          setValor={setCep} />

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
        <SelecionarEstado setId={setEstadoId} setNome={setEstado} setModal={setModalEstados} modalEstados={modalEstados} />

        <Input
          errorMessage={!cidade && 'Selecione uma cidade!'}
          label='Cidade'
          leftIcon={<Icon name='search' size={20} onPress={() => {
            if (estado != null)
              setModalCidades(!modalCidades);
            else
              Alert.alert(`Atenção`,`Selecione primeiro o estado!`);
          }} />}
          rightIcon={<Icon name='close' size={20} onPress={() => {
            setCidadeId(null);
            setCidade(null);
          }} />}
          placeholder='Pesquise e selecione uma cidade'
          value={cidade}
        />
        <SelecionarCidade
          setId={setCidadeId}
          setNome={setCidade}
          setModal={setModalCidades}
          modalCidades={modalCidades}
          estadoId={estadoId}
        />

        <View style={theme.containners.buttonsCancelConfir}>
          <BotaoCancelar carregando={carregando} titulo='Cancelar' pressionado={() => navigation.goBack()} desabilitado={false} />
          <BotaoAlterar carregando={carregando} titulo={route.params ? 'Alterar' : 'Salvar'} pressionado={salvarCliente} desabilitado={
            !nomeRazaoSocial ||
            !apelidoNomeFantazia ||
            !cpfCnpj ||
            !celular ||
            !telefone ||
            !email ||
            !logradouro ||
            !numero ||
            !complemento ||
            !bairro ||
            !cep ||
            !cidade
          } />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;