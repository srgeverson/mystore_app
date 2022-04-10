import React, { useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Card, Text } from 'react-native-elements';
import logo from '../../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import BotaoEntrar from '../../../components/BotaoEntrar';
import { AuthorityContext } from '../../../../core/contexts';
import { authorizationServerLogin } from '../../../../core/api';
import { salvarTokenLogin, getTokenLogin, getLoginSalvo } from '../../../../services/UsuarioService';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [token, setToken] = useState(null);

    const { signIn } = useContext(AuthorityContext);

    const recuperaTokenSalvo = async () => {
        setCarregando(true);
        //const tokenSalvo = await getTokenLogin();
        const loginSalvo = await getLoginSalvo();
        if (loginSalvo) {
            setToken(loginSalvo.token);
            setEmail(loginSalvo.email);
            setSenha(loginSalvo.senha);
        }
        //setEmail(`geversonjosedesouza@hotmail.com`);
        //setSenha(`123456`);
        //console.log(`recuperaTokenSalvo = ${tokenSalvo}`);
        //rsetToken(tokenSalvo);
        setCarregando(false);
    }

    useEffect(() => {
        recuperaTokenSalvo();
    }, [])

    const entrar = async () => {
        try {
            setCarregando(true);
            var retornoAutenticacao = null;
            console.log('Botão entrar...');
            if (!token)
                retornoAutenticacao = await authorizationServerLogin(email, senha);
            if (token)
                signIn();

            //Quando dá erro de comunicação com o servidor e existe token salvo
            if (retornoAutenticacao.codigo == 503 && token)
                signIn();

            //Quando dá erro de comunicação com o servidor e não existe token salvo
            if (retornoAutenticacao.codigo == 503 && !token)
                Alert.alert("Atênção", "Falha ao conectar com o servidor ou este é seu primeiro acesso!");

            //Quando retornar o token
            if (retornoAutenticacao.access_token) {
                await salvarTokenLogin(
                    retornoAutenticacao.usuarios_id,
                    retornoAutenticacao.access_token,
                    retornoAutenticacao.expires_in,
                    retornoAutenticacao.token_type,
                    retornoAutenticacao.scope,
                    retornoAutenticacao.nome_completo,
                    retornoAutenticacao.jti,
                    retornoAutenticacao.refresh_token,
                    retornoAutenticacao.empresas[0],
                    email,
                    senha
                );
                signIn();
            } else {
                Alert.alert("Dados inválidos", "Preencha corretamente e tente novamente!");
            }
        } catch (error) {
            console.log(`Ocorreu erro em /src/viwes/usuario/Login -> ${new Date()} -> erro: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const recuperarSenha = () => {
        navigation.navigate('RecuperarSenha');
    }

    const validarAcesso = () => {
        navigation.navigate('PrimeiroAcesso');
    }

    return (
        <SafeAreaView>
            <Card>
                <Card.Image source={logo} style={styles.logo} />
                <Input
                    keyboardType='email-address'
                    autoCapitalize='none'
                    placeholder="Digite seu email aqui"
                    onChangeText={value => setEmail(value)}
                    value={email}
                    errorMessage={!email && 'E-mail é obrigatório!'}
                    leftIcon={<Icon name="envelope" size={18} />} />

                <Input
                    placeholder='Digite sua senha aqui'
                    onChangeText={value => setSenha(value)}
                    value={senha}
                    errorMessage={!senha && 'Senha é obrigatório!'}
                    secureTextEntry={true}
                    leftIcon={<Icon name="key" size={18} />} />

                <BotaoEntrar carregando={carregando} titulo="Entrar" pressionado={entrar} desabilitado={!email || !senha} />
                <Card.Divider />
                <Card.Title>
                    <Text style={styles.recuperarSenha} onPress={recuperarSenha}>Esqueceu a senha?</Text>
                    {'  '}
                    <Text style={styles.validarAcesso} onPress={validarAcesso}>Primeiro acesso?</Text>
                </Card.Title>
            </Card>
        </SafeAreaView>
    )
}

export default Login;