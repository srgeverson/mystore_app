import { api } from '../core/api';
import ClienteRepository from '../repository/ClienteRepository';

export const atualizarTudoPorId = async (cliente) => {
    try {
        return ClienteRepository.updateAllById(cliente);
    } catch (error) {
        console.log(`Erro no método atualizarTudoPorId do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const atualizarTudoPorIdLocal = async (cliente) => {
    try {
        return ClienteRepository.updateAllByIdLocal(cliente);
    } catch (error) {
        console.log(`Erro no método atualizarTudoPorIdLocal do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return ClienteRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterApelidoOuNome = async (nome) => {
    try {
        return ClienteRepository.selectLikeByApelidoOrNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorId = async (id) => {
    try {
        return ClienteRepository.selectById(id);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorIdLocal = async (idLocal) => {
    try {
        return ClienteRepository.selectByIdLocal(idLocal);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorItensNaoSincronizados = async () => {
    try {
        return ClienteRepository.selectByVersaoIsNull();
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

export const enviar = async (token, empresa) => {
    try {
        //const { empresa, token } = await getLoginSalvo();
        //console.log('Ops...');
        const clientesLocal = ClienteRepository.selectLikeByIdDistinctIdLocal();
        //console.log('Qtd: ' + select.rows.length);
        //console.log(select.rows.raw());
        clientesLocal.rows.raw().forEach(async (element) => {
            console.log(isNumber(element.idLocal));
            if (!isNumber(element.idLocal)) {
                const clienteLocal = {
                    nomeRazaoSocial: element.nomeRazaoSocial,
                    apelidoNomeFantazia: element.apelidoNomeFantazia,
                    cpfCnpj: element.cpfCnpj,
                    celular: element.celular,
                    telefone: element.telefone,
                    email: element.email,
                    endereco: {
                        logradouro: element.endereco ? element.endereco.logradouro : null,
                        numero: element.endereco ? element.endereco.numero : null,
                        complemento: element.endereco ? element.endereco.complemento : null,
                        bairro: element.endereco ? element.endereco.bairro : null,
                        cep: element.endereco ? element.endereco.cep : null,
                        cidade: {
                            id: element.endereco ? element.endereco.cidade ? element.endereco.cidade.id : null : null
                        }
                    }
                }
                const cliente = await postClientes(token, empresa, clienteLocal);
                if (cliente.status == 201) {
                    console.log('Clientes enviado comsucesso!');
                    await cadastrarOuAtualizar(cliente);
                } else {
                    if (cliente.status == 400) {
                        const criticas = cliente.objects.map((object) => object.userMessage).join(', ');
                        console.log(criticas);
                        await cadastrarOuAtualizar({ element, ...{ criticas } });
                    }
                }
            } else if (!element.versao) {
                const clienteLocal = {
                    nomeRazaoSocial: element.nomeRazaoSocial,
                    apelidoNomeFantazia: element.apelidoNomeFantazia,
                    cpfCnpj: element.cpfCnpj,
                    celular: element.celular,
                    telefone: element.telefone,
                    email: element.email,
                    endereco: {
                        id: element.endereco ? element.endereco.id : null,
                        logradouro: element.endereco ? element.endereco.logradouro : null,
                        numero: element.endereco ? element.endereco.numero : null,
                        complemento: element.endereco ? element.endereco.complemento : null,
                        bairro: element.endereco ? element.endereco.bairro : null,
                        cep: element.endereco ? element.endereco.cep : null,
                        cidade: {
                            id: element.endereco ? element.endereco.cidade ? element.endereco.cidade.id : null : null
                        }
                    }
                }
                const cliente = await putClientes(token, empresa, clienteLocal, element.id);
                if (cliente.status == 200) {
                    console.log('Clientes enviado comsucesso!');
                    await cadastrarOuAtualizar(cliente);
                } else if (cliente.status == 400) {
                    console.log('Clientes foi criticado ao enviar!');
                    const criticas = cliente.objects.map((object) => object.userMessage).join(', ');
                    await cadastrarOuAtualizar({ element, ...{ criticas } });
                }
            }
        });
    } catch (error) {
        console.log(`Erro no método enviar do arquivo ClienteService  -> ${new Date()} -> erro: ${error}`);
    }
}

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
                console.log(`Erro na requisição da API endpoint getClientes! Erro: ${error.message}`);
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

export const postClientes = async (token, idEmpresa, cliente) => {
    try {
        return await api(token)
            .post(`/v1/empresas/${idEmpresa}/clientes`, cliente)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API endpoint postClientes! Erro: ${error.message}`);
                if (error.response) {
                    return error.response.data;
                } else {
                    throw error;
                }
            });
    } catch (error) {
        console.log(`Erro no método postClientes do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const putClientes = async (token, idEmpresa, cliente, idCliente) => {
    try {
        return await api(token)
            .put(`/v1/empresas/${idEmpresa}/clientes/${idCliente}`, cliente)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API endpoint putClientes! Erro: ${error.message}`);
                if (error.response) {
                    return error.response.data;
                } else {
                    throw error;
                }
            });
    } catch (error) {
        console.log(`Erro no método putClientes do arquivo ClientesService -> ${new Date()} -> erro: ${error}`);
    }
}

export const sincronizar = async (token, empresa) => {
    try {
        let cliente = await getClientes(token, empresa);
        if (cliente._embedded) {
            cliente._embedded.clientes.forEach(async (element) => {
                await cadastrarOuAtualizar({
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
                    versao: element.versao,
                });
            });
        }
    } catch (error) {
        console.log(`Erro no método sincronizar do arquivo ClienteService  -> ${new Date()} -> erro: ${error}`);
    }
}