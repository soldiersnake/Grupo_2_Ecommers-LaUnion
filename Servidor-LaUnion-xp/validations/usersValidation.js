const {body} = require('express-validator');
const path = require('path');

module.exports = {
    createUsersValidation: [
        body('user').notEmpty().withMessage('El campo Usuario es obligatorio'),
        body('name').notEmpty().withMessage('El campo Nombre es obligatorio'),
        body('lastName').notEmpty().withMessage('El campo Apellido es obligatorio'),
        body('email')
            .notEmpty().withMessage('El campo Email es obligatorio').bail()
            .isEmail().withMessage('Debes de escribir un formato de correo Valido'),
        body('password').notEmpty().withMessage('El campo contraseña es obligatorio').bail().isLength({min: 8}).withMessage('La contraseña es obligatorio, Debe tener Min 8 Caracteres'),
        body('confirmPassword').notEmpty().withMessage('Debe confirmar su contraseña').bail().isLength({min: 8}).withMessage('Debe confirmar su contraseña'),
        body('avatar')
                .custom(function(value, {req}){
                    return req.file;
                })
                .withMessage('Campo obligatorio imagen')
                .bail()
                .custom(function(value, {req}){
                    const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];
                    const extension = path.extname(req.file.originalname);
                    return extensionesAceptadas.includes(extension);
                }).withMessage('Imagen invalida, debe de ser .jpg .png .jpeg'),
    ],
}
