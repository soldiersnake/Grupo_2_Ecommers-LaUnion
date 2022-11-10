const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

//funcion para enlistar todos los users
function findAllUsers() {
  const jsonDataUsers = fs.readFileSync(path.join(__dirname, '../data/users.json'));
  const users = JSON.parse(jsonDataUsers);
  return users;
};

//funcion para añadir los datos a nuestro usersController
function writeFile(users) {
  // ,null y ,4 sirven para formatear el json
  const dataString = JSON.stringify(users, null, 4);
  //sobreescribimos todo el archivo con la nueva informacion:
  fs.writeFileSync(path.join(__dirname, '../data/users.json'), dataString);
};

//Funcion para generar id's de los usuarios
function newId() {
  //guardamos todos los usuarios
  const users = findAllUsers();
  //guardamos el ultimo usuario del archivo
  const lastUser = users.pop();
  if (lastUser) {
    //sumamos 1 al id del ultimo usuario registrado en el archivo
    return lastUser.id + 1;
  }
  //en el caso en el que no exista un usuario, devolvemos 1
  return 1;
};

//Funcion para buscar usuarios en la bd por cualquier campo
function detalleUser(field, text) {
  const users = findAllUsers();
  let userFound = users.find(usuario => {
    return usuario[field] == text;
  });
  return userFound;
  //res.render('./users/detalle-usuario', { user: userFound });
}
const usersController = {
  //Buscar usuarios por su id:
  detalleUserId: function (req, res, next) {
    const users = findAllUsers();
    let userFound = users.find(usuario => {
      return usuario.id == req.params.id
    });
    res.render('./users/detalle-usuario', { user: userFound });
  },
  //Renderizar formulario de inicio de sesion
  login: function (req, res, next) {
    res.render('./users/login');
  },
  loginProcess: function (req, res, next) {
    //verificamos que el email ingresadp exista en la base de datos
    let userToLogin = detalleUser('email', req.body.email);
    //caso en el que el email existe en la bd
    if (userToLogin) {
      //desencriptamos la contraseña brindad por el usuario
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
      //verificar la contraseña del usuario que intenta ingresar
      if (isOkThePassword) {
        //borramos la contraseña para que no exista el registro en session por seguridad
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        //Si en el formulario de inicio de sesion se tildo la opcion de recuerdame, vamos a setear una cookie: maxAge: (1000*60)*2 = 2minutos
        if (req.body.rememberMe) {
          res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
        }

        //caso en el que coincide la contraseña ingresada con la de la db
        return res.redirect('./profile');
      }
      //caso en el que no coincide la contraseña
      return res.render('./users/login', {
        errors: {
          email: {
            msg: 'Las credenciales son invalidas'
          }
        }
      });
    }
    //caso en el que no se encuantra el email en la bd
    return res.render('./users/login', {
      errors: {
        email: {
          msg: 'No se encuentra este email en nuestra base de datos, te invitamos a registrarte'
        }
      }
    });
  },
  //Renderizar la vista de perfil de usuario 
  profile: function (req, res, next) {
    res.render('./users/userProfile', {
      user: req.session.userLogged
    });
  },
  //Renderizar formulario de registro
  register: function (req, res, next) {
    res.render('./users/register');
  },
  //Crear un usuario
  createUser: (req, res) => {
    // requerir el validador
    const resultValidation = validationResult(req);
    //Si hay errores en el envio delo formulario
    if (!resultValidation.isEmpty()) {
      let errors = resultValidation.mapped();
      //Si no hay un error de imagen:
      if (!errors.avatar) {
        //si existe un archivo de imagen de perfil lo borramos
        if (req.file && fs.existsSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename))) {
          fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename));
        }
      }
      //renderizamos nuevamente el formulario con los errores presentados y la persistencia de los datos enviados
      res.render('./users/register', {
        errors: resultValidation.mapped(),
        old: req.body
      })
    } else {
      //trae los usuarios
      const users = findAllUsers();
      //miramos si el email usuario esta registrado en la bd 
      let userInDb = detalleUser('email', req.body.email);
      //En el caso en de que se encuentre el email en el sistema se crea un error
      if (userInDb) {
        return res.render('./users/register', {
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          old: req.body
        });
      }
      // caso contrario, utilizamos los campos del formulario para crear el nuevo usuario
      const newUser = {
        id: newId(),
        user: req.body.user,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename
      };
      users.push(newUser);
      writeFile(users);
      res.redirect('/users/login');
    }
  },
  //Eliminar usuarios
  delete: (req, res) => {
    const users = findAllUsers();
    const userToDelete = users.find(function (usuario) {
      return usuario.id == req.params.id;
    });
    fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", userToDelete.avatar));
    users.splice(users.findIndex(function (usuario) {
      return usuario.id == req.params.id;
    }), 1);
    writeFile(users);
    res.redirect('/');
  },
  logout: (req, res) => {
    //Eliminamos la cookie del email almacenado
    res.clearCookie('userEmail');
    //Eliminamos los datos de la sesion
    req.session.destroy();
    //redirigimos a la ruta de inicio
    return res.redirect('/');
  },
  editUser: (req, res) => {
    res.render('./users/editUserProfile')
  }
}


module.exports = usersController;