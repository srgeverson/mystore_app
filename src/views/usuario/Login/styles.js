import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../assets/styles/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.light
    },
    logo: {
        paddingBottom: 20,
        width: 200,
        height: 150
    },
    cadastro: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    recuperarSenha: {
        color: theme.colors.primary,
        margin: 5,
        fontSize: 15,
    },
    validarAcesso: {
        color: theme.colors.primary,
        margin: 5,
        fontSize: 15,
    }
});

export default styles;