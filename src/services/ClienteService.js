import { api } from '../core/api';
import ClienteRepository from '../repository/ClienteRepository';
import { getTokenLogin } from './UsuarioService';
const versao = '1';

export const getClientes = async (idEmpresa) => {
    const token = await getTokenLogin();
    try {
        return await api(token)
            .get(`/v${versao}/empresas/${idEmpresa}/clientes`)
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

export const cadastrar = async (cliente) => {
    try {
        return ClienteRepository.insert(cliente);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrarOuAtualizar = async (cliente) => {
    try {
        return ClienteRepository.insertOrReplace(cliente);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const sincronizar = async () => {
    try {
        //Implementar a consulta do id da empresa aqui
        let retorno = await getClientes(1);
        if (retorno._embedded.clientes)
            retorno._embedded.clientes.forEach(element => cadastrarOuAtualizar({ id: element.id, apelidoNomeFantazia: element.apelidoNomeFantazia, enderecoId: element.endereco.id }));
    } catch (error) {
        console.log(`Erro no método sincronizar do arquivo ClienteService  -> ${new Date()} -> erro: ${error}`);
    }
}