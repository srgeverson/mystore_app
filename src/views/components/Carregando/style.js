import { StyleSheet } from 'react-native';
import { theme } from '../../../assets/styles/theme';

const styles = StyleSheet.create({
    containner: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    text: {
        fontSize: 15,
        color: '#FFF'
    }
});

export default styles;