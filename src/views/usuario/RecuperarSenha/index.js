import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';

const RecuperarSenha = () => {

    const navigation = useNavigation();

    const recuperarSenha = () => {

        navigation.navigate('Login');
    }

    return (
        <>
            <View>
                <Card>
                    <Card.Title>Recuperar Senha</Card.Title>
                    <Card.Divider />
                    <Card.Image source={logo}>
                    </Card.Image>
                    <Input
                        placeholder="Digite seu email aqui"
                        leftIcon={<Icon name="envelope" size={18}/>}
                    //onChangeText={value => setEmail(value)}
                    //errorMessage={!email && !menssagemDeErro ? 'Usuário é obrigatório!' : ''}
                    />
                    <BotaoConfirmar titulo="Trocar" pressionado={recuperarSenha} />
                </Card>
            </View>
        </>
    )
}

export default RecuperarSenha;