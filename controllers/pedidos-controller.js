const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT pedidos.id_pedidos, 
                            pedidos.quantidade, 
                            produtos.id_produtos, 
                            produtos.nome, 
                            produtos.preco 
                       FROM pedidos  
                 INNER JOIN produtos 
                         ON produtos.id_produtos = pedidos.id_produtos;`,
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    pedidos: result.map(pedidos => {
                        return {
                            id_pedidos: pedidos.id_pedidos,
                            quantidade: pedidos.quantidade,
                            produto: {

                                id_produto: pedidos.id_produtos,
                                nome: pedidos.nome,
                                preco: pedidos.preco
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedidos específico',
                                url: 'http://localhost:3000/pedidos/' + pedidos.id_pedidos
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
}
exports.postPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM produtos WHERE id_produtos = ?',
            [req.body.id_produtos],
            (error, result, field) => {

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não foi encontrado!'
                    })
                }
                conn.query('INSERT INTO pedidos(id_produtos, quantidade) VALUES(?, ?)',
                    [req.body.id_produtos, req.body.quantidade],
                    (error, result, field) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({
                                error: error,
                                response: null
                            })
                        }

                        if (result.length == 0) {
                            return res.status(404).send({
                                mensagem: 'Não foi encontrado pedidos com este ID'
                            })
                        }
                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedidos: result.id_pedidos,
                                id_produtos: req.body.id_produtos,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: 'http://localhost:3000/pedidos'
                                }
                            }
                        }
                        return res.status(201).send(response);

                    })

            })
    })
}

exports.getUmPedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;', // ? query data
            [req.params.id_pedidos], // ? busca os dados do body
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado pedidos com este ID'
                    })
                }
                const response = {
                    mensagem: 'Detalhes do Pedido:',
                    pedido: {
                        id_pedidos: result[0].id_pedidos,
                        id_produtos: result[0].id_produtos,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um pedido',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }


                return res.status(201).send(response);
            }
        )
    });

}

exports.deletePedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM pedidos WHERE id_pedidos = ?`, [req.body.id_pedidos],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado pedidos com este ID'
                    })
                }
                const response = {
                    mensagem: 'Pedido Removido com sucesso',

                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produtos: 'Number',
                            quantidade: 'Number'
                        }
                    }

                }


                return res.status(201).send(response);

            }
        )
    });
}

