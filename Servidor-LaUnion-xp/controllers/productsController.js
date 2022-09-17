let products = require('../js/products');


const productsController = {
    detalle: function(req, res, next) {
        let productFound = products.find(producto => {
            return producto.id == req.params.id
        });
        res.render('./products/detalle-producto', {product:productFound});
    },
    carrito: function(req, res, next) {
        res.render('./products/carrito');
      }

}

module.exports = productsController;