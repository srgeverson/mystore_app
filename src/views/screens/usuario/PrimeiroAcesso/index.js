import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import styles from './styles';
import { validarAcesso } from '../../../../services/UsuarioService';

const PrimeiroAcesso = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [codigoAcesso, setCodigoAcesso] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigation = useNavigation();

    const validar = async () => {
        setCarregando(true);
        const retorno = await validarAcesso(`/usuarios/cadastrar-senha`, { codigoAcesso, email, senha });
        console.log(JSON.stringify(retorno));
        if ((retorno.codigo != 200) && (retorno.codigo != 201) && (retorno.codigo != 204)) {
            Alert.alert('Operação não realizada', `Tente novamente mais tarde! ${retorno.mensagem ? retorno.mensagem : ''}`);
        } else {
            Alert.alert('Operação realizada', 'Senha cadastrada com sucesso!');
            navigation.navigate('Login');
        }
        setCarregando(false);
    }

    return (
        <>
            <SafeAreaView>
                <Card>
                    <Card.Image source={logo} style={styles.logo} />
                    <Input
                        keyboardType='numeric'
                        placeholder="Digite o código"
                        onChangeText={value => setCodigoAcesso(value)}
                        value={codigoAcesso}
                        errorMessage={!codigoAcesso && 'Código é obrigatório!'}
                        leftIcon={<Icon name="sort-numeric-desc" size={18} />} />

                    <Input
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder="Digite seu email aqui"
                        onChangeText={value => setEmail(value)}
                        value={email}
                        errorMessage={!email && 'E-mail é obrigatório!'}
                        leftIcon={<Icon name="envelope" size={18} />} />

                    <Input
                        placeholder='Crie sua senha aqui'
                        onChangeText={value => setSenha(value)}
                        value={senha}
                        errorMessage={!senha && 'Senha é obrigatório!'}
                        secureTextEntry={true}
                        leftIcon={<Icon name="key" size={18} />} />

                    <Input
                        placeholder='Confirme sua senha'
                        onChangeText={value => setConfirmaSenha(value)}
                        value={confirmaSenha}
                        errorMessage={!confirmaSenha ? 'Senha é obrigatório!' : confirmaSenha != senha ? 'As senhas não são iguais!': ''}
                        secureTextEntry={true}
                        leftIcon={<Icon name="key" size={18} />} />
                    <BotaoConfirmar titulo="Validar" carregando={carregando} pressionado={validar} desabilitado={!email || !senha || !codigoAcesso || (senha != confirmaSenha)} />
                </Card>
            </SafeAreaView>
        </>
    )
}

export default PrimeiroAcesso;