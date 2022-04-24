import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../assets/styles/theme';

const BotaoCancelar = (props) => {
    return (
        <>
            <Button
                title={props.titulo}
                onPress={props.pressionado}
                icon={
                    props.carregando ?
                        <ActivityIndicator size={theme.sizes.icon} color={theme.colors.light} />
                        :
                        <Icon
                            name="close"
                            size={theme.sizes.icon}
                            color={theme.colors.light}
                            style={{ marginRight: theme.margins.iconTextRight }} />
                }
                disabled={props.carregando || props.desabilitado}
                //onPressIn={() => props.voltar}
            />
        </>
    )
}
export default BotaoCancelar;