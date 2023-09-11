// este archivo solo tiene el código del servidor.
const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path")

// Inicializaciones
const app = express()

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

// Global variables

// Routes
app.use(require("./routes/index.routes"))

// Statics files (archivos que cualquier cliente puede acceder desde el servidor)
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;