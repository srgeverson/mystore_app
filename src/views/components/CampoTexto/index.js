import React from "react";
import { TextInput } from "react-native";
import { createGuid } from '../../../core/Utils';

const CampoTexto = ({ descricaoDoCampo, indice, mensagemDeErro, nomeDoCampo, valor, setValor }) => {
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
                onChangeText={value => value ? setValor(value) : setValor(null)}
                placeholder={descricaoDoCampo}
                keyboardType='default'
            />
        </>
    );
}

export default CampoTexto;