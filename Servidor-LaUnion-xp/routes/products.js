var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET home page. */
router.get('/detalle/:id', productsController.detalle);

router.get('/carrito/:id', productsController.carrito);

router.get('/create', productsController.create);
router.post('/create', productsController.create);

router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', productsController.update);

module.exports = router;