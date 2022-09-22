let products = require('../js/products');
let categories = require('../js/categories');

const productsController = {
    detalle: function(req, res, next) {
        let productFound = products.find(producto => {
            return producto.id == req.params.id
        });
        res.render('./products/detalle-producto', {product : productFound});
    },
    
    biblioteca: function(req, res){
        res.render('./products/biblioteca', {products, categories});
    },
    juegos: function(req, res){
        res.render('./products/juegos', {products, categories});
    },
    figuras: function(req, res){
        res.render('./products/figuras', {products, categories});
    },

    carrito: function(req, res, next) {
        let productToBuy = products.find(producto => {
            return producto.id == req.params.id;
        });
        res.render('./products/carrito', {product : productToBuy});
    },
    create: function(req, res) {
        res.render("./products/create");
    },
    edit: function(req, res) {
        let productToEdit = products.find(producto => {
            return producto.id == req.params.id;
        });
        res.render("./products/edit", { product : productToEdit});
    },
    // update: function(){

    // }

}

module.exports = productsController;