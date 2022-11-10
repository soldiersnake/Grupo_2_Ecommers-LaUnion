// Módulos
var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

//Módulos propios
const productsController = require('../controllers/productsController');
const { createProductValidation, editProductValidation } = require('../validations/productsValidation');
const authMiddleware = require('../middlewares/authMiddleware');

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: (req, file, cb) => {
        const newFileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ 
    storage: storage, 
    fileFilter: (req, file, cb)=>{
        const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];

        const info = path.extname(file.originalname)

        const result = extensionesAceptadas.includes(info)

        //Se agrego esta linea de codigo//
        if(!result){
            req.file = file;
        }
        //------------------------------//

        cb(null, result);
    } 
});


//Páginas por categoria de producto
router.get('/biblioteca', productsController.biblioteca);
router.get('/juegos', productsController.juegos);
router.get('/figuras', productsController.figuras);

//Detalle de producto
router.get('/detalle/:id', productsController.detalle);

//Carrito por producto
router.get('/carrito/:id', productsController.carrito);

//Cerar productos
router.get('/create',authMiddleware, productsController.create);
router.post('/create',authMiddleware, upload.single("imagen"), createProductValidation, productsController.store);
//

//Editar productos
router.get('/edit/:id',authMiddleware, productsController.edit);
router.put('/edit/:id',authMiddleware, upload.single("imagen"), editProductValidation, productsController.update);

//Eliminar productos
router.delete('/delete/:id',authMiddleware, productsController.delete);

module.exports = router;