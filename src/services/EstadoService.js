import { api } from '../core/api';
import EstadoRepository from '../repository/EstadoRepository';
import { getTokenLogin } from './UsuarioService';
const versao = '1';

export const getEstados = async (nome) => {
    const token = await getTokenLogin();
    try {
        return await api(token)
            .get(`/v${versao}/estados`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getEstados!`);
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