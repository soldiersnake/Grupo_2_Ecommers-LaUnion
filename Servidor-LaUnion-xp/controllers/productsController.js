const productsController = {
    detalle: function(req, res, next) {
        res.render('./products/detalle-producto');
    },
    carrito: function(req, res, next) {
        res.render('./products/carrito');
      }

}

module.exports = productsController;