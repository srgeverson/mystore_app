import Database from "../core/database";

class EstadoRepository {

    deleteAll() {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM estados;`, [])
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
            Database.delete(`DELETE FROM estados WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insert(estado) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO estados VALUES (?, ?);`, [estado.id, estado.nome])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    insertOrReplace(estado) {
        return new Promise((resolve, reject) => {
            Database.insert('INSERT OR REPLACE INTO estados (ativo, critica, id, id_local, nome, uf, versao) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    estado.ativo ? estado.ativo : false,
                    estado.critica ? estado.critica : null,
                    estado.id ? estado.id : null,
                    estado.id_local ? estado.id_local : estado.id,
                    estado.nome ? estado.nome : null,
                    estado.uf ? estado.uf : null,
                    estado.versao ? estado.versao : null,
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
            Database.select(`SELECT * FROM estados WHERE (1=1);`, [])
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
            Database.select(`SELECT * FROM estados WHERE (ativo = true AND nome LIKE '%${nome}%');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectUltimaVersao() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT  MAX(versao) AS versao FROM estados;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateAllById(estado) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE estados SET nome = ? WHERE (id = ?);`, [estado.nome, estado.id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default new EstadoRepository();