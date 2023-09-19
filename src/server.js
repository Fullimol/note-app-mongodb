// este archivo solo tiene el código del servidor.
const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require('passport')

// Inicializaciones
const app = express()
require('./config/passport')

// Settings
app.set('port', process.env.PORT || 8080); //Si en ".env" no se encuentra la url del server, usar el localhost.
app.set('views', path.join(__dirname, 'views')) //Para que busque la carpeta "views".

app.engine('.hbs', exphbs.engine({//Crea motor de handlebars.
    defaultLayout: "main",
    //"path.join" se utiliza para unir rutas de directorio, se está uniendo la ruta al directorio de vistas con la cadena.
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set("view engine", ".hbs")

// Middlewares
app.use(express.urlencoded({ extended: false })) //convierte los datos que se reciben en un objeto .JSON
app.use(methodOverride('_method')) // sirve para usar "delete" y "put" en el form.
app.use(session({
    secret:'secretKey',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize()) //tiene que ir DESPUES de "session" ya que se bsaa en ese modulo.
app.use(passport.session())
app.use(flash())

// Global variables
app.use((req, res, next) => { 
    res.locals.mensage_exito = req.flash('mensage_exito') //Recuperar un mensaje flash llamado 'mensage_exito' y lo guarda como respuesta.
    res.locals.mensage_error = req.flash('mensage_error')
    res.locals.error = req.flash('error') // Esto corresponde a passport, y "error" es el nombre por defecto que agrega passport.
    res.locals.user = req.user || null

    next()
})

// Routes  (cada archivo de la carpeta routes lo importo acá)
app.use(require("./routes/index.routes"))
app.use(require("./routes/notes.routes"))
app.use(require("./routes/users.routes"))



// Statics files (archivos que cualquier cliente puede acceder desde el servidor)
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;