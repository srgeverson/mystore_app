import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import styles from './styles';
import { recuperarSenha } from '../../../../services/UsuarioService';

const RecuperarSenha = () => {

    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const [carregando, setCarregando] = useState(false);

    const recuperar = async () => {
        setCarregando(true);
        const retorno = await recuperarSenha(`/usuarios/${email}/codigo-acesso`);
        console.log(JSON.stringify(retorno));
        if ((retorno.codigo != 200) && (retorno.codigo != 201) && (retorno.codigo != 204)) {
            Alert.alert('Operação não realizada', `Tente novamente mais tarde! ${retorno.mensagem ? retorno.mensagem : ''}`);
        } else {
            Alert.alert('Operação realizada', 'Em breve voce receberá um e-mail com o código de acesso!');
            navigation.navigate('PrimeiroAcesso');
        }
        setCarregando(false);
    }

    return (
        <>
            <SafeAreaView>
                <Card>
                    <Card.Image source={logo} style={styles.logo} />
                    <Input
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder="Digite seu email aqui"
                        leftIcon={<Icon name="envelope" size={18} />}
                        onChangeText={value => setEmail(value)}
                        errorMessage={!email && 'E-mail é obrigatório!'}
                    />
                    <BotaoConfirmar titulo="Trocar" carregando={carregando} pressionado={recuperar} desabilitado={!email} />
                </Card>
            </SafeAreaView>
        </>
    )
}

export default RecuperarSenha;