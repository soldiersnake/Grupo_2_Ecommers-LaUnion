const {body} = require('express-validator');
const path = require('path');

module.exports = {
    //Validaciones del formulario de creación de productos
    createProductValidation: [
        body('name')
            .notEmpty()
            .withMessage('Ingresa un nombre válido'),
        body('price')
            .notEmpty()
            .withMessage('Ingresa un precio válido')
            .bail()
            .isNumeric()
            .withMessage('Ingrese un valor númerico'),
        body('description')
            .notEmpty()
            .withMessage('Ingresa una descripción válida'),
        body('imagen')
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
        body('categoryId')
            .notEmpty()
            .withMessage('Tienes que elegir una categoría')
    ],
    //Validaciones del formulario de edición de productos: pendiente!!
    editProductValidation: [
        body('name')
            .notEmpty()
            .withMessage('Ingresa un nombre válido'),
        body('price')
            .notEmpty()
            .withMessage('Ingresa un precio válido')
            .bail()
            .isNumeric()
            .withMessage('Ingrese un valor númerico'),
        body('description')
            .notEmpty()
            .withMessage('Ingresa una descripción válida'),
        body('imagen')
            .custom(function(value, {req}){
                if(req.file){
                    const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];
                    const extension = path.extname(req.file.originalname);
                    return extensionesAceptadas.includes(extension);
                }
                return true;
            }).withMessage('Imagen invalida, debe de ser .jpg .png .jpeg')
    ]
}