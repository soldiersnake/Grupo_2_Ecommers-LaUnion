var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

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
const upload = multer({storage:storage});

// validaciones
const validation = [
    body('user').notEmpty().withMessage('El campo Usuario es obligatorio'),
    body('name').notEmpty().withMessage('El campo Nombre es obligatorio'),
    body('lastName').notEmpty().withMessage('El campo Apellido es obligatorio'),
    body('email').notEmpty().withMessage('El campo Email es obligatorio'),
    body('password').notEmpty().withMessage('El campo contraseña es obligatorio'),
    body('confirmPassword').notEmpty().withMessage('El campo confirmar contraseña es obligatorio'),
];

/* GET users listing. */
router.get('/login', usersController.login);

// formulario registro
router.get('/register', usersController.register);
// Procesar el registro
router.post('/register', upload.single("avatar"), validation, usersController.RegisterUser);

module.exports = router;
