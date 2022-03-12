import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderLeft = () => {

    const navigation = useNavigation();
    
    try {
        return (
            <Button
                icon={
                    <Icon
                        onPress={() => navigation.openDrawer()}
                        name="bars"
                        size={20}
                        color='#FFF' />
                }
            />);
    } catch (error) {
        console.log(`Erro no método HeaderLeft do arquivo HeaderLeft -> ${new Date()} -> erro: ${error}`);
    }
}

export default HeaderLeft;
