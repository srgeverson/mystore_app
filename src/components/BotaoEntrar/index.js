import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../assets/styles/theme';

const BotaoEntrar = (props) => {
    return (
        <>
            <Button
                title={props.titulo}
                onPress={props.pressionado}
                icon={
                    <Icon
                        name="unlock"
                        size={theme.sizes.icon}
                        color={theme.colors.light}
                        style={{ marginRight: theme.margins.iconTextRight }} />
                }
            />
        </>
    )
}
export default BotaoEntrar;