// Módulos
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');
//las cookies se almacenan en el navegador
const cookies = require("cookie-parser");

var indexRouter = require('./src/routes/home');
var usersRouter = require('./src/routes/users');
let productsRouter = require('./src/routes/products');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

//Configuración

//Session
app.use(session({
    secret: "Shhh, It's a secret",
    resave: false,
    saveUninitialized: false
}));
//Cookies
app.use(cookies());
//Usuario Logueado
app.use(userLoggedMiddleware);

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.json());
//Para recibir la informacion que llega de los formularios:
app.use(express.urlencoded({ extended: false }));
//Recursos estáticos:
app.use(express.static(path.join(__dirname, 'public')));


// app.use(logger('dev'));
// app.use(cookieParser());


/* RUTAS: */
app.use('/', indexRouter);

//Rutas Usuarios
app.use('/users', usersRouter);

//Rutas products
app.use('/products', productsRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
