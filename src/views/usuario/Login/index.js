import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Image, Text } from 'react-native-elements';
import logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import BotaoEntrar from '../../../components/BotaoEntrar';

const Login = () => {

    const navigation = useNavigation();

    const [menssagemDeErro, setMenssagemDeErro] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const criticas = () => {
        if (!email) {
            setMenssagemDeErro("Preencha o campo usuário!");
            return false;
        }
        if (!senha) {
            Alert.alert("", "Preencha o campo senha!");
            return false;
        }

        return true;
    }

    const entrar = async () => {
        if (!criticas()) return;

        // await api.post('/login', { email, password }).then((response) => {
        //     alert("Sucesso!");
        //     //console.log(response.data);
        // }).catch((err) => {
        //     Alert.alert("", err.response.data.message);
        // });
        navigation.navigate('BemVindo');
    }

    const recuperarSenha = () => {
        navigation.navigate('RecuperarSenha');
    }

    const validarAcesso = () => {
        navigation.navigate('PrimeiroAcesso');
    }    

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Input
                placeholder="Digite seu email aqui"
                onChangeText={value => setEmail(value)}
                errorMessage={!email && !menssagemDeErro ? 'Usuário é obrigatório!' : ''} />

            <Input
                placeholder='Digite sua senha aqui'
                onChangeText={value => setSenha(value)}
                errorMessage={!senha && !menssagemDeErro ? 'Senha é obrigatório!' : ''}
                secureTextEntry={true} />

            <BotaoEntrar titulo="Entrar" pressionado={entrar} />
            <View style={styles.cadastro}>
                <Text style={styles.recuperarSenha} onPress={recuperarSenha}>Esqueceu a senha?</Text>
                <Text style={styles.validarAcesso} onPress={validarAcesso}>Primeiro acesso?</Text>
            </View>
        </View>
    )
}

export default Login;