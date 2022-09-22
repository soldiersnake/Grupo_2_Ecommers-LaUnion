var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET home page. */
router.get('/detalle/:id', productsController.detalle);

router.get('/carrito/:id', productsController.carrito);

router.post('/create', productsController.create);

router.post('/edit', productsController.edit);

module.exports = router;