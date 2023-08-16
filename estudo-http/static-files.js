// importar express

const express = require('express');
const { dirname } = require('path');
const path = require('path');

// criar app ou serve chamando a fn express()

const app = express();

// navegador -> express -> function home
// navegador -> express -> middleware -> function home

// middleware - static files

app.use(express.static('public'));

// funções

function home(req, res){
    const caminho = path.join(__dirname, 'pages', 'home.html');
    res.sendFile(caminho);
}

// localhost:3001/produto?id=3
function produto(req, res){
    const produtos = ['banana', 'maça', 'uva', 'melancia'];
    const id = req.query.id;

    if(id < 0 || id >= produtos.length){
        res.status(404);
        res.send("produto não encontrado");
        return;
    }

    res.send(produtos[id]);
}

// localhost:3001/contato?tipo=formulario
// localhost:3001/contato?tipo=texto
function contato(req, res){
    const tipo = req.query.tipo;
    console.log(req.query);

    if(tipo==='formulario'){
        const caminho = path.join(__dirname, 'pages', 'contato-form.html');
        res.sendFile(caminho);
    } else {
        const caminho = path.join(__dirname, 'pages', 'contato-texto.html');
        res.sendFile(caminho);
    }
}

// configurar rotas

app.get('/', home)
app.get('/contato', contato);
app.get('/produto', produto);

// subir o server chamado fn listen()
app.listen(3001, () => console.log('Rodando na porta 3001'));