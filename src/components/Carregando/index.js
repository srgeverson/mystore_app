import React from 'react';
import { View, ActivityIndicator,Text } from 'react-native';
import styles from './style';

const Carregando = (props) => {
    return (
        <>
            <View style={styles.containner}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.text}>Carregando...</Text>
            </View>
        </>
    )
}
export default Carregando;