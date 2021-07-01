import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Image } from 'react-native-elements';
import logo from '../../../assets/images/logo.png'

const Login = () => {

    const navigation = useNavigation();

    const novoUsuario = () => {
        navigation.navigate('Cadastrar');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={logo}
                style={{ width: 150, height: 150 }}
            />
            <Input
                placeholder="Digite seu email aqui"
                onChangeText={value => console.log(value)}
            />

            <Input
                placeholder='Digite sua senha aqui'
            />
            <Button
                title="Entrar"
                color='green'
                onPress={novoUsuario} />

        </View>
    )
}

export default Login;