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
    }

    insert(cliente) {
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT INTO clientes (
                apelidoNomeFantazia,
                ativo,
                celular,
                cpfCnpj,
                criticas,
                dataCadastro,
                email,
                empresasId,
                enderecosId,
                id,
                idLocal,
                nomeRazaoSocial,
                telefone,
                versao
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.ativo ? cliente.ativo : null,
                    cliente.celular ? cliente.celular : null,
                    cliente.cpfCnpj ? cliente.cpfCnpj : null,
                    cliente.criticas ? cliente.criticas : null,
                    cliente.dataCadastro ? cliente.dataCadastro : null,
                    cliente.email ? cliente.email : null,
                    cliente.empresasId ? cliente.empresasId : null,
                    cliente.enderecosId ? cliente.enderecosId : null,
                    null,//NULL pois este campo deve possuir o id retornado pela API
                    cliente.idLocal ? cliente.idLocal : cliente.id,
                    cliente.nomeRazaoSocial ? cliente.nomeRazaoSocial : null,
                    cliente.telefone ? cliente.telefone : null,
                    cliente.versao ? cliente.versao : null,
                ]).then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    insertOrReplace(cliente) {
        console.log(cliente)
        return new Promise((resolve, reject) => {
            Database.insert(`INSERT OR REPLACE INTO clientes (
                apelidoNomeFantazia,
                ativo,
                celular,
                cpfCnpj,
                criticas,
                dataCadastro,
                email,
                empresasId,
                enderecosId,
                id,
                idLocal,
                nomeRazaoSocial,
                telefone,
                versao
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.ativo ? cliente.ativo : null,
                    cliente.celular ? cliente.celular : null,
                    cliente.cpfCnpj ? cliente.cpfCnpj : null,
                    cliente.criticas ? cliente.criticas : null,
                    cliente.dataCadastro ? cliente.dataCadastro : null,
                    cliente.email ? cliente.email : null,
                    cliente.empresasId ? cliente.empresasId : null,
                    cliente.enderecosId ? cliente.enderecoId : null,
                    cliente.id ? cliente.id : null,
                    cliente.idLocal ? cliente.idLocal : cliente.id,
                    cliente.nomeRazaoSocial ? cliente.nomeRazaoSocial : null,
                    cliente.telefone ? cliente.telefone : null,
                    cliente.versao ? cliente.versao : null,
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

    selectById(id) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (id = '${id}');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    selectByIdLocal(id) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (id = '${id}');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectByIdLocal(idLocal) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (idLocal = '${idLocal}');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectByVersaoIsNull() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (versao is null);`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectLikeByApelidoOrNome(nome) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (apelidoNomeFantazia LIKE '%${nome}%' OR nomeRazaoSocial LIKE '%${nome}%');`, [])
                .then((success) => {
                    resolve(success);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    selectLikeByIdDistinctIdLocal() {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE id <> IdLocal OR versao IS NULL;`, [])
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
            Database.select(`SELECT * FROM clientes WHERE (apelidoNomeFantazia LIKE '%${nome}%');`, [])
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
            Database.select(`SELECT MAX(versao) AS versao FROM clientes;`, [])
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

    updateAllByIdLocal(cliente) {
        console.log(cliente);
        let sql = '';
        sql += 'UPDATE ';
        sql += 'clientes ';
        sql += 'SET ';
        sql += 'apelidoNomeFantazia = ?, ';
        sql += 'ativo = ?, ';
        sql += 'celular = ?, ';
        sql += 'cpfCnpj = ?, ';
        sql += 'criticas = ?, ';
        sql += 'dataCadastro = ?, ';
        sql += 'email = ?, ';
        sql += 'empresasId = ?, ';
        sql += 'enderecosId = ?, ';
        //sql += 'id = ?, ';
        sql += 'idLocal = ?, ';
        sql += 'nomeRazaoSocial = ?, ';
        sql += 'telefone = ?, ';
        sql += 'versao = ? ';
        sql += `WHERE (idLocal = '${cliente.idLocal}');`;
        console.log(sql);
        return new Promise((resolve, reject) => {
            Database.update(
                sql,
            [
                cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                cliente.ativo ? cliente.ativo : null,
                cliente.celular ? cliente.celular : null,
                cliente.cpfCnpj ? cliente.cpfCnpj : null,
                cliente.criticas ? cliente.criticas : null,
                cliente.dataCadastro ? cliente.dataCadastro : null,
                cliente.email ? cliente.email : null,
                cliente.empresasId ? cliente.empresasId : null,
                cliente.enderecosId ? cliente.enderecoId : null,
                //cliente.id,
                cliente.idLocal,
                cliente.nomeRazaoSocial ? cliente.nomeRazaoSocial : null,
                cliente.telefone ? cliente.telefone : null,
                cliente.versao ? cliente.versao : null
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

export default new CidadeRepository();