var express = require('express');
let products = require('../js/products');
let categories = require('../js/categories');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {products,categories});
});

module.exports = router;
