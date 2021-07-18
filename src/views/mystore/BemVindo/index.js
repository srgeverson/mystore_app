import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const BemVindo = () => {

    const offline = useState(true);

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Header
                placement="center"
                leftComponent={
                    <Button
                        icon={
                            <Icon
                                onPress={() => navigation.openDrawer()}
                                name="bars"
                                size={20}
                                color='#FFF' />}
                    />}
                centerComponent={{ text: 'My Store', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={<Button
                    icon={
                        offline ?
                            <Icon
                                onPress={() => Alert.alert('Dispositivo off-line', 'Dados serão sincronizados com o servidor quando voltar a internet!')}
                                name="warning"
                                size={20}
                                color='#FFFF00' />
                            :
                            <Icon
                                onPress={() => Alert.alert('Dispositivo on-line', 'Dados estão sincronizados com o servidor!')}
                                name="refresh"
                                size={20}
                                color='#90EE90' />
                    }
                />}
            />
        </SafeAreaView>
    )
}

export default BemVindo;
