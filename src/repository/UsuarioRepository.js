import Database from "../core/database";

class UsuarioRepository {

    deleteAll() {
        return new Promise((resolve, reject) => {
            Database.delete(`DELETE FROM usuarios;`, [])
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
            Database.delete(`DELETE FROM usuarios WHERE (id = ?);`, [id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    insert(usuario) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO usuarios VALUES (?, ?);`, [usuario.id, usuario.nome])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    insertOrReplace(usuario) {
        return new Promise((resolve, reject) => {
            Database.insert('INSERT OR REPLACE INTO usuarios (accessToken, data, expiresIn, id, jti, nome, tokenType, scope) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    usuario.accessToken ? usuario.accessToken : null,
                    usuario.data ? JSON.stringify(usuario.data) : null,
                    usuario.expiresIn ? usuario.expiresIn : 0,
                    usuario.id ? usuario.id : 0,
                    usuario.jti ? usuario.jti : null,
                    usuario.nome ? usuario.nome : null,
                    usuario.tokenType ? usuario.tokenType : null,
                    usuario.scope ? usuario.scope : null,
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
            Database.select(`SELECT * FROM usuarios WHERE (1=1);`, [])
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
            Database.select(`SELECT * FROM usuarios WHERE (nome LIKE '%${nome}%');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectByTokenExpireData(){
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM usuarios WHERE (accessToken IS NOT NULL AND expiresIn IS NOT NULL AND data IS NOT NULL);`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateAllById(usuario) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE usuarios SET nome = ? WHERE (id = ?);`, [usuario.nome, usuario.id])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default new UsuarioRepository();