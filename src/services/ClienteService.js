import { api } from '../core/api';
import ClienteRepository from '../repository/ClienteRepository';

export const getClientes = async (token, idEmpresa) => {
    try {
        const ultimaVersao = await ClienteRepository.selectUltimaVersao();
        let ultVersao = -1;
        if (ultimaVersao.rows && ultimaVersao.rows.item(0).versao != null)
            ultVersao = ultimaVersao.rows.item(0).versao;
            
        return await api(token)
            .get(`/v1/empresas/${idEmpresa}/clientes/versao?ultimaVersao=${ultVersao}`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getClientes! Erro: ${error.message}`);
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

export const sincronizar = async (token, empresa) => {
    try {
        let cliente = await getClientes(token, empresa);
        if (cliente._embedded) {
            cliente._embedded.clientes.forEach(element => {
                cadastrarOuAtualizar({
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
                    versao: element.versao > -1 ? element.versao : null,
                });
            });
        }
    } catch (error) {
        console.log(`Erro no método sincronizar do arquivo ClienteService  -> ${new Date()} -> erro: ${error}`);
    }
}