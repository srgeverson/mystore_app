import { api } from '../core/api';
import ClienteRepository from '../repository/ClienteRepository';
import { getTokenLogin } from './UsuarioService';
const versao = '1';

export const getClientes = async (nome) => {
    const token = await getTokenLogin();
    try {
        return await api(token)
            .get(`/v${versao}/cidades`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getClientes!`);
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
        console.log(`Erro no método getClientes do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return ClienteRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrar = async (cidade) => {
    try {
        return ClienteRepository.insert(cidade);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrarOuAtualizar = async (cidade) => {
    try {
        return ClienteRepository.insertOrReplace(cidade);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}