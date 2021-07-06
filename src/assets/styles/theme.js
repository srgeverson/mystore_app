import React from "react";
import { Dimensions } from "react-native";

const logoWidth = 200;

export const theme = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#dc3545',
        light: '#f8f9fa',
        dark: '#343a40',
    },
    sizes: {
        icon: 15,
        logoWidth: logoWidth,
        logoHeight: 150
    },
    margins: {
        iconTextLeft: 5,
        iconTextRight: 5
    },
    positions: {
        imageLogoLeft: (Dimensions.get('window').width - logoWidth) / 4
    }
}