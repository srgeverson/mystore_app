import Database from "../core/database";

class UsuarioRepository {

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
        console.log(JSON.stringify(usuario));
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT OR REPLACE INTO usuarios (accessToken, tokenType, expiresIn, scope, id, nome, jti, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, 
            [usuario.accessToken, usuario.tokenType, usuario.expiresIn, usuario.scope, usuario.id, usuario.nome, usuario.jti, usuario.data])
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