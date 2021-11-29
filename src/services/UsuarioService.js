import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../config/api';

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
};

export const limparTokenLogin = async () => {
    try {
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@expires_in');
        await AsyncStorage.removeItem('@data');
    } catch (error) {
        console.log(`Erro no método getTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
};

export const salvarTokenLogin = async (access_token, expires_in) => {
    try {
        await AsyncStorage.setItem('@access_token', access_token);
        await AsyncStorage.setItem('@expires_in', JSON.stringify(expires_in));
        await AsyncStorage.setItem('@data', JSON.stringify(new Date()));
    } catch (error) {
        console.log(`Erro no método salvarTokenLogin do arquivo UsuarioService -> ${new Date()} -> erro: ${error}`);
    }
};

// const valUser = async () => {
//     const valueToken = await AsyncStorage.getItem('@token');

//     const headers = {
//         'headers': {
//             'Authorization': `Bearer ${valueToken}`
//         }
//     }

//     await api.get('/perfil', headers)
//         .then((respose) => {
//             console.log(respose.data);
//             if (respose.data.user === null) {
//                 AsyncStorage.removeItem('@token');
//             } else {
//                 AsyncStorage.setItem('@token', respose.data.token);
//             }
//         }).catch((err) => {
//             AsyncStorage.removeItem('@token');
//         })
// }