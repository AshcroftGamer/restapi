const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaCadastro = require('./routes/usuarios');

// * O Morgan monitora toda requisição em rotas HTTP 
app.use(morgan('dev'));



app.use('/uploads', express.static('uploads')); // ? transforma a pasta upload em publica e acessível
app.use(bodyparser.urlencoded({ extended: false })); // ? apenas dados simples
app.use(bodyparser.json()) // ? Entrada de arquivos JSON no body


app.use('/pedidos', rotaPedidos);
app.use('/produtos', rotaProdutos);
app.use('/usuarios', rotaCadastro);


// ? CORS - CROSS ORIGIN RESOUCE SHARING
// * Conjunto de regras nas quais determina o que pode ser acessado e o que pode ...
// * não pode ser, com limites de acesso, entre outros.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header(
        'Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    next();
});

// ! Tratamento criado para quando não for encontrado nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    return res.send({
        erro: {
            message: error.message
        }
    });
});


module.exports = app;