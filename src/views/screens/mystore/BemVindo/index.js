import React from 'react';
import { SafeAreaView, Image } from 'react-native';
import logo from '../../../../assets/images/logo.png';
import styles from './styles';


const BemVindo = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={logo}
            />
        </SafeAreaView>
    )
}

export default BemVindo;
