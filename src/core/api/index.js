import axios from 'axios';

const URL_API = 'http://localhost:8080';

const api = async (token) => {
    try {
        return await axios.create({
            baseURL: URL_API,
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
            baseURL: URL_API,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic bXlzdG9yZS1hcHA6MTIzMzIx',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).post(
            '/oauth/token',
            `username=${email}&password=${senha}&grant_type=password`,
        ).then((response) => {
            console.log(`Token de acesso gerado com sucesso!`);
            return response.data;
        }).catch((err) => {
            console.log(`Erro ao gerar o token de acesso!`);
            if( err.response ){
                console.log(Promise.resolve({ error })); // => the response payload 
            }
            return err;
        });
    } catch (error) {
        console.log(`Erro ao gerar o token de acesso -> ${new Date()} -> erro: ${error}`);
    }
}

const authorizationServerRecuperarSenha = async () => {
    try {
        return await axios.create({
            baseURL: URL_API,
            headers: { 'Authorization': 'Basic bXlzdG9yZS13ZWI6MTIzMzIx', 'Content-Type': 'application/x-www-form-urlencoded' },
        }).post(
            '/oauth/token',
            `grant_type=client_credentials`
        ).then((response) => {
            console.log(`Token de recuperação de senha gerado com sucesso!`);
            return response.data;
        }).catch((err) => {
            console.log(`Erro ao gerar token de recuperação de senha!`);
            throw err;
        });
    } catch (error) {
        console.log(`Erro ao gerar token de recuperação de senha -> ${new Date()} -> erro: ${error}`);
    }
}

export { authorizationServerLogin, authorizationServerRecuperarSenha, api };