import React from "react";
import { TextInput } from "react-native";
import { createGuid } from '../../../core/Utils';
import { telefoneMask } from '../../../core/helpers/masks';

const CampoTelefone = ({ descricaoDoCampo, indice, mensagemDeErro, nomeDoCampo, valor, setValor }) => {
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
                onChangeText={value => {
                    if (value)
                        setValor(telefoneMask(value));
                    else
                        setValor(null);
                }}
                placeholder={descricaoDoCampo}
                keyboardType='number-pad'
            />
        </>
    );
}

export default CampoTelefone;