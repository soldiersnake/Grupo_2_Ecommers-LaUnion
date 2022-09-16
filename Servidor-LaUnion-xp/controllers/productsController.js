const productsList = require('../js/products');
const categoiresList = require('../js/categories');


const productsController = {
    detalle: function(req, res, next) {
        console.log(req.params.id);
        res.render('./products/detalle-producto');

    },
    carrito: function(req, res, next) {
        res.render('./products/carrito');
      }

}

module.exports = productsController;