const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

//funcion para enlistar todos los users
function findAllUsers() {
    const jsonDataUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const users = JSON.parse(jsonDataUsers);
    return users;
};

//Funcion para buscar usuarios en la bd por cualquier campo
function detalleUser(field, text) {
    const users = findAllUsers();
    let userFound = users.find(usuario => {
      return usuario[field] == text;
    });
    return userFound;
};

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    //podemos obtener el email del usuario que clickeo recuerdame
    let emailInCookie = req.cookies.userEmail;
    //Buscamos a ese usuario en nuestra base de datos
    let userFromCookie = detalleUser('email', emailInCookie);
    //Nota: si solo dejamos el email almacenado en la cookie, nunca podremos cerrar sesion hasta que la cookie caduque, para ello invocamos un metodo en la funcion de logout del controlador
    //si el email del usuario existe en nuestra bd lo pasamos a sesión
    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        //pasamos el usuario de una variable local a la sesion para poder usar el usuario en las vistas
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}
module.exports = userLoggedMiddleware;