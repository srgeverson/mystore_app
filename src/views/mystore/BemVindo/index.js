import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const BemVindo = () => {

    const navigation = useNavigation();

    return (
        <View>
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
            //rightComponent={{ icon: 'home', color: '#fff' }} 
            />
        </View>
    )
}

export default BemVindo;
