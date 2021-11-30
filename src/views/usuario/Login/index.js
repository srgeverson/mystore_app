import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Card, Text } from 'react-native-elements';
import logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import BotaoEntrar from '../../components/BotaoEntrar';
import { AuthorityContext } from '../../../core/contexts';
import { authorizationServerLogin } from '../../../core/api';
import { salvarTokenLogin } from '../../../services/UsuarioService';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('paulistensetecnologia@gmail.com');
    const [senha, setSenha] = useState('123456');
    const [carregando, setCarregando] = useState(false);

    const { signIn, signOut } = useContext(AuthorityContext);

    const criticas = () => {
        if (!email) {
            Alert.alert("Dados incompletos", "Preencha o campo email!");
            return false;
        }
        if (!senha) {
            Alert.alert("Dados incompletos", "Preencha o campo senha!");
            return false;
        }

        return true;
    }

    const entrar = async () => {
        if (!criticas()) return;
        setCarregando(true);
        const dadosAutenticacao = await authorizationServerLogin(email, senha);
        if (dadosAutenticacao.access_token) {
            try {
                await salvarTokenLogin(dadosAutenticacao.access_token, dadosAutenticacao.expires_in);
                signIn();
            } catch (error) {
                console.log(`Ocorreu erro em /src/viwes/usuario/Login -> ${new Date()} -> erro: ${error}`);
                signOut();
            }
        }else{
            Alert.alert("Dados inválidos", "Preencha corretamente e tente novamente!"); 
        }
        setCarregando(false);
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

                <BotaoEntrar carregando={carregando} titulo="Entrar" pressionado={entrar} />
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