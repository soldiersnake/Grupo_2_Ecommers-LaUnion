// Módulos
var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();
const path = require('path');
const multer = require('multer');

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img'))
    },
    filename: (req, file, cb) => {
        const newFileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({storage:storage});


//Páginas por categoria de producto
router.get('/biblioteca', productsController.biblioteca);
router.get('/juegos', productsController.juegos);
router.get('/figuras', productsController.figuras);
//Detalle de producto
router.get('/detalle/:id', productsController.detalle);
//Carrito por producto
router.get('/carrito/:id', productsController.carrito);
//Cerar productos
router.get('/create', productsController.create);
router.post('/create', upload.single("image"), productsController.store);
//Editar productos
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.single("image"), productsController.update);
//Eliminar productos
router.delete('/delete/:id', productsController.delete);

// router.put('/edit/:id', productsController.update);



module.exports = router;