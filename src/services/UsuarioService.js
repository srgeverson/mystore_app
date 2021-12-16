import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, authorizationServerRecuperarSenha } from '../core/api';
import UsuarioRepository from '../repository/UsuarioRepository';

const versao = '1';

export const getTokenLogin = async () => {
    try {
        const token = await AsyncStorage.getItem('@access_token');
        const expires = await AsyncStorage.getItem('@expires_in');
        const expiresMilisegundos = Math.round((//Usando esta função para arredondar os valores em caso utilise uma divisão
            expires //Tempo de expiração em segundos
            - 60 //Subtraindo para compensar a diferença do servidor até o registro do token no local storage
        ) * 1000 //Milisegundos para realizar os calculos da datas
        )
        const data = await AsyncStorage.getItem('@data');
        const dataTokenMilisegundos = new Date(JSON.parse(data)).getTime();
        const dataExpiresMilisegundos = expiresMilisegundos + dataTokenMilisegundos;
        const dataAtualMilisegundos = new Date().getTime();
        const dataRestanteMilisegundos = dataExpiresMilisegundos - dataAtualMilisegundos;
        if (token !== null || dataRestanteMilisegundos > 0) {
            return token;
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
        console.log(`Erro no método codigo-acesso do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const limparTokenLogin = async () => {
    try {
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@expires_in');
        await AsyncStorage.removeItem('@data');
    } catch (error) {
        console.log(`Erro no método getTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
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

export const salvarTokenLogin = async (access_token, token_type, expires_in, scope, usuarios_id, nome_completo, jti) => {
    try {
        const usuario = {
            accessToken: access_token,
            tokenType: token_type,
            expiresIn: expires_in,
            scope: scope,
            id: usuarios_id,
            nome: nome_completo,
            jti: jti,
            data: new Date()
        }

        await AsyncStorage.setItem('@access_token', access_token);
        await AsyncStorage.setItem('@expires_in', JSON.stringify(usuario.expiresIn));
        await AsyncStorage.setItem('@data', JSON.stringify(usuario.data));
        UsuarioRepository.insertOrReplace(usuario);
    } catch (error) {
        console.log(`Erro no método salvarTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const apagarPorId = async (id) => {
    try {
        return UsuarioRepository.deleteById(id);
    } catch (error) {
        console.log(`Erro no método apagarPorId do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const atualizar = async (usuario) => {
    try {
        return UsuarioRepository.updateAllById(usuario);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return UsuarioRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
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