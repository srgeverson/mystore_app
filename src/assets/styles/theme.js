import React from "react";
import { Dimensions } from "react-native";

const logoWidth = 200;

export const theme = {
    colors: {
        principal: '#0B89D4',
        default1: '#59BFFF',
        default2: '#1B8BD1',
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#dc3545',
        light: '#f8f9fa',
        dark: '#343a40',
        colorFocus: '#000',
        colorUnfocus: '#FF0',
    },
    sizes: {
        icon: 15,
        logoWidth: logoWidth,
        logoHeight: 150,
        sizeDrawer: 20,
        search: 50,
    },
    margins: {
        iconTextLeft: 5,
        iconTextRight: 5,
        selecionarMarginTop: 100
    },
    positions: {
        imageLogoLeft: (Dimensions.get('window').width - logoWidth) / 4
    },
    containners: {
        formCrudDefault: { flex: 1, margin: 10 },
        buttonsCancelConfir: { flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }
    }
}