import { buscarEAtualizarRefreshToken } from '../../services/UsuarioService';
import {sincronizar as sincronizarCidade} from '../../services/CidadeService';
import {sincronizar as sincronizarCliente} from '../../services/ClienteService';
import {sincronizar as sincronizarEstado} from '../../services/EstadoService';
import {calculaTempoDeAtualizacaoToken} from '../../services/UsuarioService';

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
    var teste = await calculaTempoDeAtualizacaoToken();
    if (teste.dataRestanteMilisegundos > 0) {
        setInterval(() => {
            buscarEAtualizarRefreshToken();
        }, expiresIn);
    }
}