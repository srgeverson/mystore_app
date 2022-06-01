import React from "react";
import { TextInput } from "react-native";
import { createGuid } from '../../../core/Utils';
import { cnpjMask, cpfMask } from '../../../core/helpers/masks';

const CampoCpfOuCnpj = ({ descricaoDoCampo, indice, mensagemDeErro, nomeDoCampo, valor, setValor }) => {
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
                        if (value.length > 14)
                            setValor(cnpjMask(value));
                        else
                            setValor(cpfMask(value));
                    else
                        setValor(null);
                }}
                placeholder={descricaoDoCampo}
                keyboardType='number-pad'
            />
        </>
    );
}

export default CampoCpfOuCnpj;