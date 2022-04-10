import { buscarEAtualizarRefreshToken } from '../../services/UsuarioService';
import { sincronizar as sincronizarCidade } from '../../services/CidadeService';
import { sincronizar as sincronizarCliente } from '../../services/ClienteService';
import { sincronizar as sincronizarEstado } from '../../services/EstadoService';
import { calculaTempoDeAtualizacaoToken } from '../../services/UsuarioService';

export const atualizandoDadosLocais = async () => {
    setInterval(() => {
        //Código a ser executado aqui
        console.log(`Iniciando a sincronização dos dados -> ${new Date()}...`);
        sincronizarCidade();
        sincronizarCliente();
        sincronizarEstado();
        console.log(`Finalizando a sincronização dos dados -> ${new Date()}...`);
    }, 60000);
}

export const atualizandoToken = async () => {
    var dadosTempoDeAtualizacaoToken = await calculaTempoDeAtualizacaoToken();
    //console.log(`Dados de atualizacao do token = ${JSON.stringify(dadosTempoDeAtualizacaoToken)}`);
    let expira = dadosTempoDeAtualizacaoToken.dataRestanteMilisegundos;
    if (expira > 0) {
        //console.log(`Token será atualizado em ${expira} milisegundos ${new Date()}`);
        setTimeout(() => {
            //console.log(`Atualizando token primeira vez ${new Date()}`);
            buscarEAtualizarRefreshToken();
            setInterval(() => {
                //console.log(`Atualizando token ${new Date()}`);
                //console.log(`Tempo token local ${expira}`);
                buscarEAtualizarRefreshToken();
            }, dadosTempoDeAtualizacaoToken.tempoDeSincronizacaoDoToken);
        }, expira)
    }
}
export const atualizandoTokenPrimeiraVez = async () => {
    var dadosTempoDeAtualizacaoToken = await calculaTempoDeAtualizacaoToken();
    let expira = dadosTempoDeAtualizacaoToken.dataRestanteMilisegundos;
    if (expira > 0) {
        //console.log(`Token será atualizado em ${expira} milisegundos ${new Date()}`);
        setTimeout(() => {
            //console.log(`Atualizando token primeira vez ${new Date()}`);
            buscarEAtualizarRefreshToken();
        }, expira)
    }
}