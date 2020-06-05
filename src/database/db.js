//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//exportar o banco de dados
module.exports = db;

//utilizar o objeto de banco de dados para as operações
// db.serialize(() => {
//     // com comandos SQL

//     // 1 criar uma tabela
//     // INTEGER = TYPE NUM
//     // PRIMARY KEY = campo principal (primário) que a tabela irá utilizar para identificar o registro
//     // AUTOINCREMENT = significa que terá números que irão se incrementar
//     db.run(`
//         CREATE TABLE IF NOT EXISTS points (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //2 inserir dados na tabela
//     //nos primeiros parênteses insere os campos e nos segundos os valores
//     const query = `
//         INSERT INTO points (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papés e Papelões"
//     ]

//     function afteInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     // db.run(query, values, afteInsertData);

//     // 3 consultar os dados da tabela
//     // db.all(`SELECT * FROM points`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Aqui estão os tegistros: ");
//     //     console.log(rows);
//     // })

// //     //4 deletar dado da tabela
//     // db.run(`DELETE FROM points WHERE id = ?`, [2], function(err) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Registro deletado com sucesso");
//     // })
// })