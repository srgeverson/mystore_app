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
            Database.insert(`INSERT INTO cidades VALUES (?, ?, ?);`, [cidade.id, cidade.nome, cidade.estados_id])
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
            Database.insert('INSERT OR REPLACE INTO cidades (id, nome, versao, estados_id) VALUES (?, ?, ?, ?)',
                [
                    cidade.id ? cidade.id : 0,
                    cidade.nome ? cidade.nome : null,
                    cidade.versao ? cidade.versao : 0,
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
            Database.select(`SELECT * FROM cidades WHERE (1=1);`, [])
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
    
    selectLikeByNomeAndEstadoId(nome, estadoId) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM cidades WHERE (nome LIKE '%${nome}%' AND estados_id = ${estadoId});`, [])
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

}

export default new CidadeRepository();