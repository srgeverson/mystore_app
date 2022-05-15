import { api } from '../core/api';
import EstadoRepository from '../repository/EstadoRepository';

export const getEstados = async (token) => {
    try {
        const ultimaVersao = await EstadoRepository.selectUltimaVersao();
        let ultVersao = -1;
        if (ultimaVersao.rows && ultimaVersao.rows.item(0).versao != null)
            ultVersao = ultimaVersao.rows.item(0).versao;

        return await api(token)
            .get(`/v1/estados/versao/${ultVersao}`)
            .then((respose) => {
                if (respose.data !== null) {
                    return respose.data;
                }
            }).catch((error) => {
                console.log(`Erro na requisição da API andpoint getEstados! Erro: ${error.message}`);
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
        console.log(`Erro no método getEstado do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const buscarPorConterNome = async (nome) => {
    try {
        return await EstadoRepository.selectLikeByNome(nome);
    } catch (error) {
        console.log(`Erro no método buscarPorConterNome do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrar = async (estado) => {
    try {
        return EstadoRepository.insert(estado);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const cadastrarOuAtualizar = async (estado) => {
    try {
        return EstadoRepository.insertOrReplace(estado);
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo EstadoService -> ${new Date()} -> erro: ${error}`);
    }
}

export const sincronizar = async (token) => {
    try {
        let estado = await getEstados(token);
        if (estado._embedded)
            estado._embedded.estados.forEach(async (element) => {
                await cadastrarOuAtualizar({ id: element.id, nome: element.nome, versao: element.versao, ativo: element.ativo })
            });
    } catch (error) {
        console.log(`Erro no método cadastrar do arquivo sincronizar  -> ${new Date()} -> erro: ${error}`);
    }
}