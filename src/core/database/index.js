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

  select(sql, params) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(sql, params)
              .then(([tx, results]) => {
                resolve(results);
              });
          }).then((okCallback) => {
            console.log(`SELECT executado com sucesso! select -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao executar SELECT! select -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }

  delete(sql, params) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        this.db = db;
        this.db.transaction((tx) => {
          tx.executeSql(sql, params)
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

  insert(sql, params) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(sql, params)
              .then(([tx, results]) => {
                resolve(results);
              });
          }).then((okCallback) => {
            console.log(`Dados salvos com sucesso! insertOrReplace -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao salvar dados! insertOrReplace -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }

  select(sql, params) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(sql, params)
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

  update(sql, params) {
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      ).then((db) => {
        this.db = db;
        this.db
          .transaction((tx) => {
            tx.executeSql(sql, params).then(([tx, results]) => {
              resolve(results);
            });
          }).then((okCallback) => {
            console.log(`Dados atualizados com sucesso! update -> ${new Date()} -> okCallback: ${okCallback}`);
          }).catch((errorCallback) => {
            console.log(`Erro ao atualizae dados! update -> ${new Date()} -> errorCallback: ${JSON.stringify(errorCallback)}`);
          });
      });
    });
  }
}

export default new Databese();