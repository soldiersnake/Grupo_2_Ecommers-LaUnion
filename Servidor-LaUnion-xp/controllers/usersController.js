const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

//funcion para enlistar todos los users
function findAllUsers(){
  const jsonDataUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'));
  const users = JSON.parse(jsonDataUsers);
  return users;
}

//funcion para añadir los datos a nuestro usersController
function writeFile(users){
  // ,null y ,4 sirven para formatear el json
  const dataString = JSON.stringify(users, null, 4);
  //sobreescribimos todo el archivo con la nueva informacion:
  fs.writeFileSync(path.join(__dirname, '../data/users.json'), dataString);
}

const usersController = {
    login:  function(req, res, next) {
        res.render('./users/login');
      },
    register: function(req, res, next) {
        res.render('./users/register');
      },
      RegisterUser: (req, res) => {
        // requerir el validador
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0 ){
          return res.render('./users/register', { errors : resultValidation.mapped(), oldData: req.body })
        }else{
           //trae los usuarios
          const users = findAllUsers();
          // utilizamos los campos del formulario para crear el nuevo objeto/usuario
          const newUsers = {
            user: req.body.user,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            avatar: req.file.filename,
          };
          users.push(newUsers);
          writeFile(users);
          res.redirect('/users/login');
        }
      },
}

module.exports = usersController;