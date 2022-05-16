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
                apelido_nome_fantazia,
                ativo,
                celular,
                cpf_cnpj,
                critica,
                data_cadastro,
                email,
                empresas_id,
                enderecos_id,
                id,
                id_local,
                nome_razao_social,
                telefone,
                versao
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.ativo ? cliente.ativo : null,
                    cliente.celular ? cliente.celular : null,
                    cliente.cpfCnpj ? cliente.cpfCnpj : null,
                    cliente.critica ? cliente.critica : null,
                    cliente.dataCadastro ? cliente.dataCadastro : null,
                    cliente.email ? cliente.email : null,
                    cliente.empresasId ? cliente.empresasId : null,
                    cliente.enderecosId ? cliente.enderecoId : null,
                    null,//NULL pois este campo deve possuir o id retornado pela API
                    cliente.idLocal ? cliente.idLocal : cliente.id,
                    cliente.nomeRazaoSocial ? cliente.nomeRazaoSocial : null,
                    cliente.telefone ? cliente.telefone : null,
                    cliente.versao ? cliente.versao : null,
                ])     .then((success) => {
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
                apelido_nome_fantazia,
                ativo,
                celular,
                cpf_cnpj,
                critica,
                data_cadastro,
                email,
                empresas_id,
                enderecos_id,
                id,
                id_local,
                nome_razao_social,
                telefone,
                versao
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.ativo ? cliente.ativo : null,
                    cliente.celular ? cliente.celular : null,
                    cliente.cpfCnpj ? cliente.cpfCnpj : null,
                    cliente.critica ? cliente.critica : null,
                    cliente.dataCadastro ? cliente.dataCadastro : null,
                    cliente.email ? cliente.email : null,
                    cliente.empresasId ? cliente.empresasId : null,
                    cliente.enderecosId ? cliente.enderecoId : null,
                    cliente.id ? cliente.id : null,
                    cliente.id_local ? cliente.id_local : cliente.id,
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

    selectByIdLocal(idLocal) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (id_local = '${idLocal}');`, [])
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

    selectLikeByNome(nome) {
        return new Promise((resolve, reject) => {
            Database.select(`SELECT * FROM clientes WHERE (apelido_nome_fantazia LIKE '%${nome}%');`, [])
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
            Database.select(`SELECT * FROM clientes WHERE (apelido_nome_fantazia LIKE '%${nome}%' OR nome_razao_social LIKE '%${nome}%');`, [])
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
        return new Promise((resolve, reject) => {
            Database.update(`
                            UPDATE 
                                clientes 
                            SET 
                                apelido_nome_fantazia = ?,
                                ativo= ?,
                                celular= ?,
                                cpf_cnpj= ?,
                                critica= ?,
                                data_cadastro= ?,
                                email= ?,
                                empresas_id= ?,
                                enderecos_id= ?,
                                id= ?,
                                id_local= ?,
                                nome_razao_social= ?,
                                telefone= ?,
                                versao = ?
                            WHERE (id_local = ${cliente.idLocal});`, 
            [
                cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                cliente.ativo ? cliente.ativo : null,
                cliente.celular ? cliente.celular : null,
                cliente.cpfCnpj ? cliente.cpfCnpj : null,
                cliente.critica ? cliente.critica : null,
                cliente.dataCadastro ? cliente.dataCadastro : null,
                cliente.email ? cliente.email : null,
                cliente.empresasId ? cliente.empresasId : null,
                cliente.enderecosId ? cliente.enderecoId : null,
                cliente.id,
                cliente.id,
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