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
        body('image')
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png'];

            if(!file){
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        }),
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
            .withMessage('Ingresa una descripción válida')
    ]
}