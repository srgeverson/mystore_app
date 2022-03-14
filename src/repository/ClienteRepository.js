import Database from "../core/database";

class CidadeRepository {

    deleteAll() {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM clientes;`, [])
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
            Database.delete(`DELETE FROM clientes WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }r

    insert(cliente) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO clientes VALUES (?, ?, ?);`, [cliente.id, cliente.nome, cliente.estados_id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    insertOrReplace(cliente) {
        return new Promise((resolve, reject) => {
            Database.insert('INSERT OR REPLACE INTO clientes (id, apelidoNomeFantazia, enderecoId) VALUES (?, ?, ?)',
                [
                    cliente.id ? cliente.id : 0,
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.enderecoId ? cliente.enderecoId : null,
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
            Database.select(`SELECT * FROM clientes WHERE (1=1);`, [])
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
            Database.select(`SELECT * FROM clientes WHERE (nome LIKE '%${nome}%');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateAllById(cliente) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE clientes SET nome = ? WHERE (id = ?);`, [cliente.nome, cliente.id])
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