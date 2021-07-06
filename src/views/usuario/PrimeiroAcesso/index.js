import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../assets/images/logo.png';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import styles from './styles';

const PrimeiroAcesso = () => {

    const [email, setEmail] = useState('');

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
                    <Card.Image source={logo} style={styles.logo} />
                    <Input
                        placeholder="Digite seu email aqui"
                        leftIcon={<Icon name="envelope" size={18} />}
                        onChangeText={value => setEmail(value)}
                        errorMessage={!email ? 'E-mail é obrigatório!' : ''}
                    />
                    <BotaoConfirmar titulo="Validar" pressionado={validarAcesso} />
                </Card>
            </View>
        </>
    )
}

export default PrimeiroAcesso;