const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login');

const produtosController = require('../controllers/produtos-controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// ? RETORNA TODOS OS PRODUTOS
router.get('/', produtosController.getProdutos);


// TODO: INSERE UM PRODUTO 
router.post('/', login.obrigatorio, upload.single('produto_imagem'), produtosController.postProdutos);


// TODO: RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produtos', produtosController.getUmProduto);


// * ALTERA UM PRODUTO
router.patch('/', login.obrigatorio, produtosController.patchProduto);


// ! EXCLUI UM PRODUTO
router.delete('/', login.obrigatorio, produtosController.deleteProduto /**/);



module.exports = router;