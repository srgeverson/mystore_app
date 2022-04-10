import { api, authorizationServerRecuperarSenha, refreshToken } from '../core/api';
import UsuarioRepository from '../repository/UsuarioRepository';

const versao = '1';

export const apagarPorId = async (id) => {
    try {
        return UsuarioRepository.deleteById(id);
    } catch (error) {
        console.log(`Erro no método apagarPorId do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const atualizarPorId = async (id) => {
    try {
        return UsuarioRepository.updateAllById(id);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const atualizarRefreshToken = async ({ id, data, token }) => {
    try {
        const usuario = await refreshToken(token);
        return UsuarioRepository.updateTokenAndRefreshTokenById({ id, accessToken: usuario.refresh_token, data, refreshToken: usuario.refresh_token });
    } catch (error) {
        console.log(`Erro no método atualizarRefreshToken do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarEAtualizarRefreshToken = async () => {
    try {
        const usuario = await buscarRefreshToken();
        if (usuario.rows.item(0)) {
            let data = new Date();
            console.log(`Atualizando token -> ${data}...`);
            await atualizarRefreshToken({ id: usuario.rows.item(0).id, data: data, token: usuario.rows.item(0).refreshToken });
        }
    } catch (error) {
        console.log(`Erro no método buscarEAtualizarRefreshToken do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return UsuarioRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarRefreshToken = async () => {
    try {
        return UsuarioRepository.selectByRefreshToken();
    } catch (error) {
        console.log(`Erro no método buscarRefreshToken do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarTodos = async () => {
    try {
        return UsuarioRepository.selectAll();
    } catch (error) {
        console.log(`Erro no método buscarTodos do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrar = async (usuario) => {
    try {
        return UsuarioRepository.insert(usuario);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const calculaTempoDeAtualizacaoToken = async () => {
    const usuarioSelectByTokenExpireData = await UsuarioRepository.selectByTokenExpireData();
    const usuarioAutenticadoAnteriormente = usuarioSelectByTokenExpireData.rows.item(0);
    let token = null;
    let email = null;
    let senha = null;
    let data = null;
    let expires = 0;
    let expiresMilisegundos = 0;
    let dataTokenMilisegundos = 0;
    let dataExpiresMilisegundos = 0;
    let dataAtualMilisegundos = 0;
    let dataRestanteMilisegundos = 0;
    //console.log(usuarioAutenticadoAnteriormente);
    if (usuarioAutenticadoAnteriormente) {
        expires = usuarioAutenticadoAnteriormente.expiresIn;
        token = usuarioAutenticadoAnteriormente.accessToken;
        expiresMilisegundos = Math.round((((//Usando esta função para arredondar os valores em caso utilise uma divisão
            expires //Tempo de expiração em segundos
        ) * 1 //Transformar o calculo valor positivo
        ) * 1000 //Milisegundos para realizar os calculos da datas
        ) - 1000 //Subtraindo para compensar a diferença do servidor até o registro do token no banco local
        );

        data = usuarioAutenticadoAnteriormente.data;
        dataTokenMilisegundos = new Date(JSON.parse(data)).getTime();
        dataExpiresMilisegundos = expiresMilisegundos + dataTokenMilisegundos;
        dataAtualMilisegundos = new Date().getTime();
        dataRestanteMilisegundos = dataExpiresMilisegundos - dataAtualMilisegundos;
        //console.log(`Tempo de expiração do token segundos = ${expires}`)
        //console.log(`Tempo de expiração do token milisegundos = ${expiresMilisegundos}`)
        //console.log(`Data do token em milisegundos = ${dataTokenMilisegundos}`);
        //console.log(`Data de expiração do token em milisegundos = ${dataExpiresMilisegundos}`);
        //console.log(`Data atual em milisegundos = ${dataAtualMilisegundos}`);
        //console.log(dataRestanteMilisegundos);
        //await limparDataAcesso();
    }
    return { dataRestanteMilisegundos, token, tempoDeSincronizacaoDoToken: expiresMilisegundos, email, senha };
}

export const getTokenLogin = async () => {
    try {
        const dataRestanteMilisegundos = await calculaTempoDeAtualizacaoToken();
        if (dataRestanteMilisegundos.dataRestanteMilisegundos > 0) {
            return dataRestanteMilisegundos.token;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`Erro no método getTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const recuperarSenha = async (uri) => {
    const token = await authorizationServerRecuperarSenha();
    try {
        return await api(token.access_token)
            .get(`/v${versao}${uri}`)
            .then((respose) => {
                if (respose)
                    return { codigo: 204, };
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint codigo-acesso! Erro: ${error}`);
                if (error.response) {
                    return {
                        codigo: error.response.status,
                        erro: error.response.error ? error.response.error : error.title,
                        mensagem: error.response.error_description ? error.response.error_description : error.detail,
                    }
                } else {
                    throw error;
                }
            });
    } catch (error) {
        console.log(`Erro no método recuperarSenha do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const limparDataAcesso = async () => {
    try {
        await UsuarioRepository.updateAllData();
    } catch (error) {
        console.log(`Erro no método getTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const getLoginSalvo = async () => {
    try {
        const dataRestanteMilisegundos = await calculaTempoDeAtualizacaoToken();
        return {
            token: dataRestanteMilisegundos.dataRestanteMilisegundos > 0 ? dataRestanteMilisegundos.token : null,
            email: dataRestanteMilisegundos.email,
            senha: dataRestanteMilisegundos.senha
        }
    } catch (error) {
        console.log(`Erro no método getLoginSalvo do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const rootEntryPoint = async () => {
    const token = await getTokenLogin();
    try {
        return await api(token)
            .get(`/v${versao}`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint rootEntryPoint!`);
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
        console.log(`Erro no método rootEntryPoint do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const validarAcesso = async (uri, dados) => {
    const token = await authorizationServerRecuperarSenha();
    try {
        return await api(token.access_token)
            .put(`/v${versao}${uri}`, dados)
            .then((respose) => {
                if (respose)
                    return { codigo: 204, };
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint cadastrar-senha! Erro: ${error}`);
                if (error.response) {
                    return {
                        codigo: error.response.status,
                        erro: error.response.error ? error.response.error : error.title,
                        mensagem: error.response.error_description ? error.response.error_description : error.detail,
                    }
                } else {
                    throw error;
                }
            });
    } catch (error) {
        console.log(`Erro no método cadastrar-senha do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const salvarTokenLogin = async (usuarios_id, token, expires_in, token_type, scope, nome_completo, jti, refresh_token, empresa, email, senha) => {
    try {
        const data = new Date();
        const expiresIn = expires_in;
        UsuarioRepository.insertOrReplace({ id: usuarios_id, accessToken: token, expiresIn, email, data, tokenType: token_type, scope, senha, nome: nome_completo, jti, refreshToken: refresh_token, empresa });
    } catch (error) {
        console.log(`Erro no método salvarTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}