import { StyleSheet } from 'react-native';
import { theme } from '../../../../assets/styles/theme';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: { color: '#FFF' },
    spinner: { color: '#FFF' }
});

export default styles;