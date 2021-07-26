const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const PedidosController = require('../controllers/pedidos-controller')


// RETORNA TODOS OS PEDIDOS 
router.get('/', PedidosController.getPedidos);


// INSERE UM PEDIDO  
router.post('/', PedidosController.postPedidos);

//  RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedidos', PedidosController.getUmPedido);


//EXCLUI UM PRODUTO
router.delete('/', PedidosController.deletePedido);



module.exports = router;