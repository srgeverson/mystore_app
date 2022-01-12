import axios from 'axios';
import { encode } from 'base-64';
import Config from 'react-native-config';

const api = (token) => {
    try {
        return axios.create({
            baseURL: Config.MY_URL,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    } catch (error) {
        console.log(`Erro ao conectar na API -> ${new Date()} -> erro: ${error}`);
    }
}

const authorizationServerLogin = async (email, senha) => {
    try {
        return await axios.create({
            baseURL: Config.MY_URL,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${encode(`${Config.CLIENT_ID_APP}:${Config.CLIENT_SECRET_APP}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `username=${email}&password=${senha}&grant_type=password`,
        ).then((response) => {
            console.log(`Token de acesso gerado com sucesso!`);
            return response.data;
        }).catch((error) => {
            console.log(`Não foi possível gerar o token de acesso!`);
            console.log(JSON.stringify(Config.MY_URL))
            if (error.response) {
                return {
                    codigo: error.response.status,
                    erro: error.response.data.error,
                    mensagem: error.response.data.error_description,
                }
            } else {
                return {
                    codigo: 503,
                    erro: error.name,
                    mensagem: error.message,
                }
            }
        });
    } catch (error) {
        console.log(`Erro ao gerar o token de acesso -> ${new Date()} -> erro: ${error}`);
    }
}

const authorizationServerRecuperarSenha = async () => {
    try {
        return await axios.create({
            baseURL: Config.MY_URL,
            headers: {
                'Authorization': `Basic ${encode(`${Config.CLIENT_ID_MANAGER}:${Config.CLIENT_SECRET_MANAGER}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).post(
            '/oauth/token',
            `grant_type=client_credentials`
        ).then((response) => {
            console.log(`Token de recuperação de senha gerado com sucesso!${response.data}`);
            return response.data;
        }).catch((error) => {
            console.log(`Erro ao gerar token de recuperação de senha!`);
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
        console.log(`Erro ao gerar token de recuperação de senha -> ${new Date()} -> erro: ${error.response}`);
    }
}

const testeURLExterna = () => {
    try {
        console.log(Config.TEST_URL_INTERNET)
        return axios.create({
            baseURL: Config.TEST_URL_INTERNET
        });
    } catch (error) {
        console.log(`Erro ao conectar na URL externa -> ${new Date()} -> erro: ${error}`);
    }
}

export { api, authorizationServerLogin, authorizationServerRecuperarSenha, testeURLExterna };