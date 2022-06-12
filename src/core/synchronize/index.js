import { buscarEAtualizarRefreshToken, getLoginSalvo } from '../../services/UsuarioService';
import { sincronizar as sincronizarCidade } from '../../services/CidadeService';
import { sincronizar as sincronizarCliente } from '../../services/ClienteService';
import { sincronizar as sincronizarEstado } from '../../services/EstadoService';
import { calculaTempoDeAtualizacaoToken } from '../../services/UsuarioService';

export const atualizandoDadosLocais = async () => {
    const { empresa, token } = await getLoginSalvo();
    setInterval(async () => {
        console.log(`Iniciando a sincronização dos dados -> ${new Date()}...`);
        await sincronizarCidade(token);
        await sincronizarCliente(token, empresa);
        await sincronizarEstado(token);
        console.log(`Finalizando a sincronização dos dados -> ${new Date()}...`);
    }, 120000);
}

export const atualizandoToken = async () => {
    var dadosTempoDeAtualizacaoToken = await calculaTempoDeAtualizacaoToken();
    let expira = dadosTempoDeAtualizacaoToken.dataRestanteMilisegundos;
    if (expira > 0) {
        setTimeout(() => {
            buscarEAtualizarRefreshToken();
            setInterval(() => {
                buscarEAtualizarRefreshToken();
            }, dadosTempoDeAtualizacaoToken.tempoDeSincronizacaoDoToken);
        }, expira);
    }
}

export const atualizandoTokenPrimeiraVez = async () => {
    var dadosTempoDeAtualizacaoToken = await calculaTempoDeAtualizacaoToken();
    let expira = dadosTempoDeAtualizacaoToken.dataRestanteMilisegundos;
    if (expira > 0) {
        setTimeout(() => {
            buscarEAtualizarRefreshToken();
        }, expira)
    }
}

export const atualizandoDadosLocaisHeaderRight = async (atualizandoDados) => {
    const { empresa, token } = await getLoginSalvo();
    setInterval(async () => {
        atualizandoDados(true);
        console.log(`Iniciando a sincronização dos dados -> ${new Date()}...`);
        await sincronizarCidade(token);
        await sincronizarCliente(token, empresa);
        await sincronizarEstado(token);
        console.log(`Finalizando a sincronização dos dados -> ${new Date()}...`);
        atualizandoDados(false);
    }, 60000);
}

export const enviandoDadosLocais = async () => {
    const { empresa, token } = await getLoginSalvo();
    setInterval(async () => {
        console.log(`Iniciando o envio dos dados locais -> ${new Date()}...`);
        // await sincronizarCidade(token);
        // await sincronizarCliente(token, empresa);
        // await sincronizarEstado(token);
        console.log(`Finalizando o envio dos dados locais -> ${new Date()}...`);
    }, 60000);
}