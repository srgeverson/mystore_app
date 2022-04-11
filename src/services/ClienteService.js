import { api } from '../core/api';
import ClienteRepository from '../repository/ClienteRepository';
import { getLoginSalvo, getTokenLogin } from './UsuarioService';
const versao = '1';

export const getClientes = async () => {
    const loginSalvo = await getLoginSalvo();
    try {
        return await api(loginSalvo.token)
            .get(`/v${versao}/empresas/${loginSalvo.empresa}/clientes`)
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
        let retorno = await getClientes();
        if (retorno._embedded) {
            //console.log(retorno._embedded.clientes)
            retorno._embedded.clientes.forEach(element => cadastrarOuAtualizar({
                id: element.id,
                apelidoNomeFantazia: element.apelidoNomeFantazia,
                nomeRazaoSocial: element.nomeRazaoSocial,
                cpfCnpj: element.cpfCnpj,
                email: element.email,
                telefone: element.telefone,
                celular: element.celular,
                dataCadastro: element.dataCadastro,
                ativo: element.ativo,
                enderecosId: element.endereco ? element.endereco.id : null,
            }));
        }
    } catch (error) {
        console.log(`Erro no método sincronizar do arquivo ClienteService  -> ${new Date()} -> erro: ${error}`);
    }
}