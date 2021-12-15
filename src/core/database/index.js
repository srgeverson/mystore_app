import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

import * as schema from './Tables';

const database_name = 'mystore.db';
const database_version = '1.0';
const database_displayname = 'MyStore';
const database_size = 200000;

class Databese {

  constructor() {
    this.type = 'SingletonDefaultExportInstance';
    this.db = null;
  }

  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest().then(() => {
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size,
        ).then((DB) => {
          this.db = DB;
          db = DB;
          db.executeSql('SELECT 1 FROM usuarios LIMIT 1')
            .then((okCallback) => {
              console.log(`Verificando as tabelas existentes! initDB -> ${new Date()} -> okCallback: ${okCallback}`);
            })
            .catch((errorCallback) => {
              console.log(`Existe tabelas a serem criadas! initDB -> ${new Date()} -> errorCallback: ${errorCallback}`);
              db.transaction((tx) => {
                for (const name in schema.Tables) {
                  this.createTable(tx, schema.Tables[name], name);
                }
              })
                .then((okCallback) => {
                  console.log(`Criação das tabelas executado com sucesso! initDB -> ${new Date()} -> okCallback: ${okCallback}`);
                })
                .catch((errorCallback) => {
                  console.log(`Erro na criação das tabelas! initDB -> ${new Date()} -> errorCallback: ${errorCallback}`);
                });
            });
          resolve(db);
        })
          .catch((errorCallback) => {
            console.log(`Erro ao inicializar banco de dados! initDB -> ${new Date()} -> errorCallback: ${errorCallback}`);
          });
      }).catch((error) => {
        console.log(`Erro ao inicializar banco de dados! initDB -> ${new Date()} -> error: ${error}`);
      });
    });
  }

  selectAll() {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        const query = "SELECT * FROM usuarios WHERE (1=1);";
        const array = [];
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(query, array)
              .then(([tx, results]) => {
                resolve(results);
              });
          }).then((okCallback) => {
            console.log(`SELECT executado com sucesso! selectAll -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao executar SELECT! selectAll -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }

  selectAllByParam(nome) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        const query = `SELECT * FROM usuarios WHERE (nome LIKE '%${nome}%');`;
        const array = [];
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(query, array)
              .then(([tx, results]) => {
                resolve(results);
              });
          }).then((okCallback) => {
            console.log(`SELECT executado com sucesso! selectAllByParam -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao executar SELECT! selectAllByParam -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }

  deleteById(id) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        const query = "DELETE FROM usuarios WHERE (id = ?);";
        const array = [id];
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(query, array)
              .then(([tx, results]) => {
                resolve(results);
              });
          }).then((okCallback) => {
            console.log(`DELETE executado com sucesso! delete -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao executar DELETE! delete -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .then((okCallback) => {
          console.log(`Conexão fechada com sucesso! closeDatabase -> ${new Date()} -> okCallback: ${okCallback}`);
        })
        .catch((errorCallback) => {
          console.log(`Erro ao fechar conexão com banco de dados! closeDatabase -> ${new Date()} -> errorCallback: ${errorCallback}`);
          this.errorCB(errorCallback);
        });
    } else {
      console.log(`Conexão já está fechada! closeDatabase -> ${new Date()} DB: ${JSON.stringify(db)}`);
    }
  }

  insertOrReplaceBatch(usuarios) {
    if (!this.db)
      this.initDB();
    return new Promise((resolve) => {
      this.db
        .transaction((tx) => {
          for (let i = 0; i < usuarios.length; i++) {
            tx.executeSql('INSERT OR REPLACE INTO usuarios VALUES (?, ?, ?);', [
              usuarios[i].id,
              usuarios[i].nome,
              usuarios[i].ativo,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          }
        }).then((okCallback) => {
          console.log(`Dados salvos com sucesso! insertOrReplace -> ${new Date()} -> okCallback: ${okCallback}`);
        }).catch((errorCallback) => {
          console.log(`Erro ao salvar dados! insertOrReplace -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
        });
    });
  }

  updateBatch(usuarios) {
    console.log(JSON.stringify(usuarios));
    if (!this.db)
      this.initDB();
    return new Promise((resolve) => {
      this.db
        .transaction((tx) => {
          for (let i = 0; i < usuarios.length; i++) {
            tx.executeSql('UPDATE usuarios SET nome = ?,  ativo = ? WHERE (id = ?);', [
              usuarios[i].nome,
              usuarios[i].ativo,
              usuarios[i].id,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          }
        }).then((okCallback) => {
          console.log(`Dados salvos com sucesso! insertOrReplace -> ${new Date()} -> okCallback: ${okCallback}`);
        }).catch((errorCallback) => {
          console.log(`Erro ao salvar dados! insertOrReplace -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
        });
    });
  }

  createTablesFromSchema() {
    try {
      if (this.db) {
        this.db.transaction((tx) => {
          for (const name in schema.Tables) {
            this.createTable(tx, schema.Tables[name], name);
          }
        });
      } else {
        console.log(`Não foi possível criar as tabelas do aplicativo! createTablesFromSchema -> ${new Date()} -> error: Conexão com o banco de dados está fechada!`);
      }
    } catch (error) {
      console.error(`Erro ao criar as tabelas do aplicativo! createTablesFromSchema -> ${new Date()} -> error: ${error}`);
    }
  }

  dropDatabase() {
    return new Promise((resolve, reject) => {
      SQLite.deleteDatabase(database_name)
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          );
        })
        .then(() => {
          console.log(`Banco de dados apagado com sucesso! dropDatabase -> ${new Date()}`);
          resolve();
        })
        .catch((errorCallback) => {
          console.log(`Não foi possível apagar o banco de dados! dropDatabase -> ${new Date()} -> errorCallback: ${errorCallback}`);
          reject(errorCallback);
        });
    }).catch((errorCallback) => {
      console.log(`Erro ao apagar banco de dados! dropDatabase -> ${new Date()} -> erro: ${errorCallback}`);
    });
  }

  createTable(tx, table, tableName) {
    //Variável do SQCRIPT de SQL.
    let sql = `CREATE TABLE IF NOT EXISTS ${tableName} `;
    //Criando array com as colunas da tabela.
    const createColumns = [];
    for (const key in table) {
      createColumns.push(
        `${key} ${table[key].type.type} ${table[key].primary_key ? 'PRIMARY KEY NOT NULL' : ''
        } default ${table[key].default_value}`,
      );
    }
    //Lendo o array de colunas montado o SQL das colunas e contatenando com a instrução SQL.
    sql += `(${createColumns.join(', ')});`;
    //Executando o script de criação da tabela.
    tx.executeSql(
      sql,
      [],
      (okCallback) => {
        console.log(`Tabela ${tableName} criada com sucesso! createTable -> ${new Date()} -> okCallback: ${JSON.stringify(okCallback)}`);
      },
      (errorCallback) => {
        console.log(`Não foi possível criar a tabela ${tableName}! createTable -> ${new Date()} -> errorCallback: ${errorCallback}`);
      },
    );
  }
}

export default new Databese();