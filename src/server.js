const express = require("express")
const server = express()

//importar o banco de dados
const db = require("./database/db");

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da aplicação (página inicial)
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    //req.query: Query strings da url
    // req.query()


    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
    //req.body: O corpo do formulário
    

    // inserir dados na tabela
    // nos primeiros parênteses insere os campos e nos segundos os valores
    const query = `
        INSERT INTO points (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afteInsertData(err) {
        if(err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true});
        
    }

    db.run(query, values, afteInsertData);    
}) 

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})

    }

    //importar os dados do banco de dados
    db.all(`SELECT * FROM points WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length;

        //mostrar a página html com os dados do database
        return res.render("search-results.html", {points: rows, total})
    })
})

//ligar o servidor
server.listen(3000) //abrir a porta 3000