import { api } from '../core/api';
import CidadeRepository from '../repository/CidadeRepository';
import { getTokenLogin } from './UsuarioService';
const versao = '1';

export const getCidades = async (token) => {
    try {
        return await api(token)
            .get(`/v${versao}/cidades`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getCidades! Erro: ${error.message}`);
                if (error.response) {
                    return {
                        codigo: error.response.status,
                        erro: error.response.data.error,
                        mensagem: error.response.data.error_description,
                    }
                } else {
                    throw error;
                }
            });
    } catch (error) {
        console.log(`Erro no método getCidades do arquivo CidadesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome, estadoId) => {
    try {
        return CidadeRepository.selectLikeByNomeAndEstadoId(nome, estadoId);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo CidadesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrar = async (cidade) => {
    try {
        return CidadeRepository.insert(cidade);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo CidadesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrarOuAtualizar = async (cidade) => {
    try {
        return CidadeRepository.insertOrReplace(cidade);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo CidadesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const sincronizar = async (token) => {
    try {
        let retorno = await getCidades(token);
        if (retorno._embedded)
            retorno._embedded.cidades.forEach(element => cadastrarOuAtualizar({ id: element.id, nome: element.nome, estados_id: element.estado.id }));
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo sincronizar  -> ${new Date()} -> erro: ${error}`);
    }
}