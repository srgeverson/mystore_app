import { StyleSheet } from 'react-native';
import { theme } from '../../../../assets/styles/theme';

const styles = StyleSheet.create({
    logo: {
        width: theme.sizes.logoWidth,
        height: theme.sizes.logoHeight,
        marginLeft: theme.positions.imageLogoLeft
    }
});

export default styles;