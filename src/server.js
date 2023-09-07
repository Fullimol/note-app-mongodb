// este archivo solo tiene el código del servidor.
const express = require('express')
const path = require("path")

// Inicializaciones
const app = express()

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views')) // para que busque la carpeta "views"

// Middlewares
app.use(express.urlencoded({ extended: false })) //convierte los datos que se reciben en un objeto .JSON

// Global variables

// Routes
app.get("/", (req, res) => {
    res.send("Hola mundo!")
})

// Statics files (archivos que cualquier cliente puede acceder desde el servidor)
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;