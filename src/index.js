// este archivo principal sirve para arrancar la aplicacion.
require('dotenv').config()  //esto lee el archivo ".env" y asigna las variables de entorno. Es para evitar tener info comprometedora en el codigo. (siempre va al inicio)

const app = require('./server')
require('./database')

app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en puerto", app.get('port'))
})