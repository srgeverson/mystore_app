import { api } from '../core/api';
import { getTokenLogin } from './UsuarioService';
const versao = '1';

export const getCidades = async (nome) => {
    const token = await getTokenLogin();
    try {
        return await api(token)
            .get(`/v${versao}/cidades`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getCidades!`);
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
        console.log(`Erro no método getCidades do arquivo CidadesService -> ${new Date()} -> erro: ${error}`);
    }
}