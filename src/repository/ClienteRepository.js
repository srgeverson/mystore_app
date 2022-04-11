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
            Database.insert(`INSERT INTO clientes VALUES (?, ?, ?);`, [cliente.id, cliente.nome, cliente.enderecoId])
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
            Database.insert(`INSERT OR REPLACE INTO clientes (
                id,
                apelido_nome_fantazia,
                nome_razao_social,
                cpf_cnpj,
                email,
                telefone,
                celular,
                data_cadastro,
                ativo,
                enderecos_id,
                empresas_id,
                versao
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.id ? cliente.id : null,
                    cliente.apelidoNomeFantazia ? cliente.apelidoNomeFantazia : null,
                    cliente.nomeRazaoSocial ? cliente.nomeRazaoSocial : null,
                    cliente.cpfCnpj ? cliente.cpfCnpj : null,
                    cliente.email ? cliente.email : null,
                    cliente.telefone ? cliente.telefone : null,
                    cliente.celular ? cliente.celular : null,
                    cliente.dataCadastro ? cliente.dataCadastro : null,
                    cliente.ativo ? cliente.ativo : null,
                    cliente.enderecosId ? cliente.enderecoId : null,
                    cliente.empresasId ? cliente.empresasId : null,
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
            Database.select(`SELECT * FROM clientes WHERE (apelido_nome_fantazia LIKE '%${nome}%');`, [])
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