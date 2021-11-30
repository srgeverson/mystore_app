import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import {rootEntryPoint} from '../../../services/UsuarioService';

const BemVindo = () => {

    return (
        <SafeAreaView>
            <Button title='Teste' onPress={async () => {
                const teste = await rootEntryPoint();
                console.log(JSON.stringify(teste));
            }} />
        </SafeAreaView>
    )
}

export default BemVindo;
