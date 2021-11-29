import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../core/api';

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
        console.log(`
                     data=${data} 
                     dataTokenMilisegundos=${dataTokenMilisegundos} 
                     expires=${expires} 
                     expiresMilisegundos=${expiresMilisegundos}
                     dataExpiresMilisegundos=${dataExpiresMilisegundos}
                     dataAtualMilisegundos=${dataAtualMilisegundos}
                     dataRestanteMilisegundos=${dataRestanteMilisegundos / 1000 / 69 / 69}
                     `)
        if (token !== null && dataRestanteMilisegundos > 0) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`Erro no método getTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
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

export const salvarTokenLogin = async (access_token, expires_in) => {
    try {
        await AsyncStorage.setItem('@access_token', access_token);
        await AsyncStorage.setItem('@expires_in', JSON.stringify(expires_in));
        await AsyncStorage.setItem('@data', JSON.stringify(new Date()));
    } catch (error) {
        console.log(`Erro no método salvarTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
}

export const rootEntryPoint = async () => {
    const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3Vhcmlvc19pZCI6MSwidXNlcl9uYW1lIjoicGF1bGlzdGVuc2V0ZWNub2xvZ2lhQGdtYWlsLmNvbSIsInNjb3BlIjpbIlJFQUQiLCJXUklURSJdLCJleHAiOjE2MzgxNzE5ODcsImF1dGhvcml0aWVzIjpbIkVESVRBUl9DTElFTlRFUyIsIkNPTlNVTFRBUl9VU1VBUklPU19HUlVQT1NfUEVSTUlTU09FUyIsIkVESVRBUl9DSURBREVTIiwiRURJVEFSX0ZPUk1BU19QQUdBTUVOVE8iLCJHRVJFTkNJQVJfUEVESURPUyIsIkVESVRBUl9FTVBSRVNBUyIsIkVESVRBUl9VU1VBUklPU19HUlVQT1NfUEVSTUlTU09FUyIsIkdFUkVOQ0lBUl9IT1NUUyIsIkNPTlNVTFRBUl9QRURJRE9TIiwiRURJVEFSX0VTVEFET1MiXSwianRpIjoiZTE5NWFlN2EtMDgxYy00NjI1LWE3OWMtNjE0YTJhNmYxMTM4Iiwibm9tZV9jb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJjbGllbnRfaWQiOiJteXN0b3JlLWFwcCJ9.NrhK_sqryguTwhl-pYKWzQ-iKDqO6zhbk7q27d1IHdJRK2dv99Jg2QT6ekSYVtbo_jtfLyuWHuJV7Iv96YAJ5uGO76ovuY7LTlMH_Rt2iIE761pBc8aepOzSQN7nkLHJyAWeOcAJAfhC8o5A33fBlaC5XWMRwOYbbO50Ymxk6F60URN8PYWXT6102f5pbU1w_ndkMD5nnlhQsxp3H2n_7d-IytphO7cp8h82pMSFza17_pp4iK5rlNNPyVBoXr5x3a7CQUW5A79P3mYBKw90YiFH6DWbiWhRN9T9opPREyPXwmocni-IwZhemXc_BsheSH0qJQ3G3epbFlx_rDjN4A`;
    try {
        return await api(token)
        .get('/v1')
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