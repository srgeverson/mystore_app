import React from "react";
import { TextInput } from "react-native";
import { createGuid } from '../../../core/Utils';
import { cepMask } from '../../../core/helpers/masks';

const CampoCEP = ({ descricaoDoCampo, indice, mensagemDeErro, nomeDoCampo, valor, setValor }) => {
    return (
        <>
            <TextInput style={{
                backgroundColor: '#fff',
                margin: 10,
                fontSize: 18,
                borderRadius: 7
            }}
                key={indice && createGuid()}
                value={valor}
                onChangeText={value => value ? setValor(cepMask(value)) : setValor(null)}
                placeholder={descricaoDoCampo}
                keyboardType='number-pad'
            />
        </>
    );
}

export default CampoCEP;