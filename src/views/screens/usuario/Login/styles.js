import { StyleSheet } from 'react-native';
import { theme } from '../../../../assets/styles/theme';

const styles = StyleSheet.create({
    logo: {
        width: theme.sizes.logoWidth,
        height: theme.sizes.logoHeight,
        marginLeft: theme.positions.imageLogoLeft
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