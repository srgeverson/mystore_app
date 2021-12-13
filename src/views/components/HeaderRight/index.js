import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../assets/styles/theme';

const HeaderRight = (props) => {

    try {
        return (
            <>
                {
                    props.carregando ?
                        <ActivityIndicator size={theme.sizes.icon} color={theme.colors.light} />
                        :
                        <Button
                            icon={
                                props.offline ?
                                    <Icon
                                        onPress={() => Alert.alert('Dispositivo off-line', 'Dados serão sincronizados com o servidor quando voltar a internet!')}
                                        name="warning"
                                        size={20}
                                        color='#FFFF00' />
                                    :
                                    <Icon
                                        onPress={() => Alert.alert('Dispositivo on-line', 'Dados estão sincronizados com o servidor!')}
                                        name="check-circle"
                                        size={20}
                                        color='#90EE90' />
                            }
                        />
                }
            </>
        );
    } catch (error) {
        console.log(`Erro no método HeaderRight do arquivo HeaderRight -> ${new Date()} -> erro: ${error}`);
    }
}

export default HeaderRight;
