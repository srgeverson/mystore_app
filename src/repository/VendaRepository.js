import Database from "../core/database";

class CidadeRepository {

    deleteAll() {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM vendas;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM vendas WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }r

    insert(cidade) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO vendas VALUES (?, ?, ?);`, [cidade.id, cidade.nome, cidade.estados_id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    insertOrReplace(cidade) {
        return new Promise((resolve, reject) => {
            Database.insert('INSERT OR REPLACE INTO vendas (id, nome, estados_id) VALUES (?, ?, ?)',
                [
                    cidade.id ? cidade.id : 0,
                    cidade.nome ? cidade.nome : null,
                    cidade.estados_id ? cidade.estados_id : null,
                ])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectAll() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM vendas WHERE (1=1);`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectLikeByNome(nome) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM vendas WHERE (nome LIKE '%${nome}%');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateAllById(cidade) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE vendas SET nome = ? WHERE (id = ?);`, [cidade.nome, cidade.id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default new CidadeRepository();