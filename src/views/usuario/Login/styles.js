import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../assets/styles/theme';

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 150
    },
    recuperarSenha: {
        color: theme.colors.primary,
        fontSize: 15,
    },
    validarAcesso: {
        color: theme.colors.primary,
        fontSize: 15,
    }
});

export default styles;