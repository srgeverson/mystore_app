export const buscaTodosDados = () => {
    setInterval(() => {
        //Código a ser executado aqui
        console.log(`Sincronizando dados -> ${new Date()}...`);
    }, 60000);
}

export const teste = (msg, callback) => {
    setInterval(() => {
        console.log(msg);
        callback();
    }, 10000);
}

export const teste1 = (msg) => {
    setInterval(() => {
        console.log(msg);
    }, 10000);
}