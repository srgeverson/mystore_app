import Database from "../core/database";

class CidadeRepository {

    deleteAll() {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM cidades;`, [])
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
            Database.delete(`DELETE FROM cidades WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insert(cidade) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO cidades VALUES (?, ?, ?);`, [cidade.id, cidade.nome, cidade.estadosId])
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
            Database.insert('INSERT OR REPLACE INTO cidades (ativo, criticas, id, idLocal, estadosId, nome, versao) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    cidade.ativo ? cidade.ativo : false,
                    cidade.criticas ? cidade.criticas : null,
                    cidade.id ? cidade.id : null,
                    cidade.idLocal ? cidade.idLocal : cidade.id,
                    cidade.estadosId ? cidade.estadosId : null,
                    cidade.nome ? cidade.nome : null,
                    cidade.versao ? cidade.versao : null,
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
            Database.select(`SELECT * FROM cidades WHERE (1=1);`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    selectLikeByNomeAndEstadoId(nome, estadoId) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM cidades WHERE (ativo = true AND nome LIKE '%${nome}%' AND estadosId = ${estadoId});`, [])
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
            Database.select(`SELECT MAX(versao) AS versao FROM cidades;`, [])
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
            Database.update(`UPDATE cidades SET nome = ? WHERE (id = ?);`, [cidade.nome, cidade.id])
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