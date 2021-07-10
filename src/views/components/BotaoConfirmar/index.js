import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../assets/styles/theme';

const BotaoConfirmar = (props) => {
    return (
        <>
            <Button
                title={props.titulo}
                onPress={props.pressionado}
                icon={
                    <Icon
                        name="check"
                        size={theme.sizes.icon}
                        color={theme.colors.light}
                        style={{ marginRight: theme.margins.iconTextRight }} />
                }
                style={{ color: theme.colors.primary }}
            />
        </>
    )
}
export default BotaoConfirmar;