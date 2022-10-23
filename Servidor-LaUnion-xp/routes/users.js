var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const { createUsersValidation } = require('../validations/usersValidation');
const usersController = require('../controllers/usersController');

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/imgUsers'))
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


// formulario registro
router.get('/register', usersController.register);
// Procesar el registro
router.post('/register', upload.single("avatar"), createUsersValidation, usersController.createUser);
// Formulario de login
router.get('/login', usersController.login);
// Procesar el login
router.post('/login', usersController.loginProcess);
//Perfil de usuario
router.get('/profile', usersController.profile);

module.exports = router;
