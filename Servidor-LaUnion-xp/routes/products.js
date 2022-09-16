var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET home page. */
router.get('/detalle/:id', productsController.detalle);

router.get('/carrito', productsController.carrito);

module.exports = router;