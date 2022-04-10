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
            Database.insert('INSERT OR REPLACE INTO usuarios (accessToken, data, email, empresa, expiresIn, id, jti, nome, refreshToken, scope, senha, tokenType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    usuario.accessToken ? usuario.accessToken : null,
                    usuario.data ? JSON.stringify(usuario.data) : null,
                    usuario.email ? usuario.email : null,
                    usuario.empresa ? usuario.empresa : null,
                    usuario.expiresIn ? usuario.expiresIn : 0,
                    usuario.id ? usuario.id : 0,
                    usuario.jti ? usuario.jti : null,
                    usuario.nome ? usuario.nome : null,
                    usuario.refreshToken ? usuario.refreshToken : null,
                    usuario.scope ? usuario.scope : null,
                    usuario.senha ? usuario.senha : null,
                    usuario.tokenType ? usuario.tokenType : null,
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
    selectLastLogin() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT email, senha FROM usuarios WHERE (accessToken IS NOT NULL AND expiresIn IS NOT NULL);`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    selectByRefreshToken() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM usuarios WHERE (refreshToken IS NOT NULL AND expiresIn IS NOT NULL) LIMIT 1;`, [])
                //Database.select(`SELECT * FROM usuarios LIMIT 1;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectByTokenExpireData() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM usuarios WHERE (accessToken IS NOT NULL AND expiresIn IS NOT NULL);`, [])
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

    updateAllData() {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE usuarios SET data = NULL, accessToken = NULL;`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateTokenAndRefreshTokenById(usuario) {
        return new Promise((resolve, reject) => {
            Database.update(`UPDATE usuarios SET accessToken = ?, data = ?, refreshToken = ? WHERE (id = ?);`, 
                [
                    usuario.accessToken ? usuario.accessToken : null,
                    usuario.data ? JSON.stringify(usuario.data) : null,
                    usuario.refreshToken ? usuario.refreshToken : null,
                    usuario.id
                ])
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