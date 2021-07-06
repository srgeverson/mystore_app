import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';

const PrimeiroAcesso = () => {

    const navigation = useNavigation();

    const validarAcesso = () => {

        navigation.navigate('Login');
    }

    return (
        <>
            <View>
                <Card>
                    <Card.Title>Validar Acesso</Card.Title>
                    <Card.Divider />
                    <Card.Image source={logo}>
                    </Card.Image>
                    <Input
                        placeholder="Digite seu email aqui"
                        leftIcon={<Icon name="envelope" size={18}/>}
                    //onChangeText={value => setEmail(value)}
                    //errorMessage={!email && !menssagemDeErro ? 'Usuário é obrigatório!' : ''}
                    />
                    <BotaoConfirmar titulo="Validar" pressionado={validarAcesso} />
                </Card>
            </View>
        </>
    )
}

export default PrimeiroAcesso;