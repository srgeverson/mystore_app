import 'react-native-gesture-handler';
import * as React from 'react';
import Routes from '../routes';
//Importacao global do base64
import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode } 

const App = () => {
    return (
        <Routes />
    );
}

export default App;