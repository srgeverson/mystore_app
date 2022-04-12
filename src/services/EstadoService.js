import { api } from '../core/api';
import EstadoRepository from '../repository/EstadoRepository';
const versao = '1';

export const getEstados = async (token) => {
    try {
        return await api(token)
            .get(`/v${versao}/estados`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getEstados! Erro: ${error.message}`);
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
        console.log(`Erro no método getEstado do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return EstadoRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrar = async (estado) => {
    try {
        return EstadoRepository.insert(estado);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}


export const cadastrarOuAtualizar = async (estado) => {
    try {
        return EstadoRepository.insertOrReplace(estado);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const sincronizar = async (token) => {
    try {
        let retorno = await getEstados(token);
        if (retorno._embedded)
            retorno._embedded.estados.forEach(element => cadastrarOuAtualizar({ id: element.id, nome: element.nome }));
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo sincronizar  -> ${new Date()} -> erro: ${error}`);
    }
}