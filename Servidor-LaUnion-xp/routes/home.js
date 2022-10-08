var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();

//funcion para enlistar todos los productos
function findAllProducts(){
  const jsonDataProducts = fs.readFileSync(path.join(__dirname, '../data/products.json'));
  const products = JSON.parse(jsonDataProducts);
  return products;
}
//funcion para enlistar todos las categorias
function findAllCategories(){
  const jsonDataCategories = fs.readFileSync(path.join(__dirname, '../data/categories.json'));
  const categories = JSON.parse(jsonDataCategories);
  return categories;
}

// Enlistar productos
router.get('/', function(req, res, next) {
  const products = findAllProducts();
  const categories = findAllCategories();
  res.render('home', {products,categories});
});

module.exports = router;
