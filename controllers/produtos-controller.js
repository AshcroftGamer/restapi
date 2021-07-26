const mysql = require('../mysql').pool;

exports.getProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.id_produtos,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto específico',
                                url: 'http://localhost:3000/produtos/' + prod.id_produtos
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });

}

exports.postProdutos = (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('INSERT INTO produtos(nome, preco, imagem_produto) VALUES(?, ?, ?)',
            [
                req.body.nome, 
                req.body.preco,
                req.file.path
            ],

            (error, result, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }


                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }


                return res.status(201).send(response);

            })
    })
}

exports.getUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produtos],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com este ID'
                    })
                }
                const response = {
                    mensagem: 'Detalhes do Produto',
                    produto: {
                        id_produto: result[0].id_produtos,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }


                return res.status(201).send(response);
            }
        )
    });
}

exports.patchProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send(
                {
                    error: error
                })
        }
        conn.query(`UPDATE produtos
                        SET nome          = ?,
                            preco         = ?
                        WHERE id_produtos = ?`,
            [req.body.nome, req.body.preco, req.body.id_produtos],

            (error, result, field) => {
                
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'Produto alterado com sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'POST',
                            descricao: 'Retorna os detalhes de um produto especifico',
                            url: 'http://localhost:3000/produtos' + req.body.id_produtos
                        }
                    }
                }


                return res.status(202).send(response);

            })
    });
}

exports.deleteProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM produtos WHERE id_produtos = ?`, [req.body.id_produtos],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto Removido com sucesso',
                    produtoRemovido: {
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos',
                            body: {
                                nome: 'String',
                                preco: 'Number'
                            }
                        }
                    }
                }


                return res.status(201).send(response);

            }
        )
    });
}