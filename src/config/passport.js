//middleware para guardar el usuario al logearse en una session en el servidor y poder navegar por la web.
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User') //traemos el modelo.

passport.use(new LocalStrategy({
    usernameField: 'email', //son los "name" de los inputs.
    passwordField: 'password'
}, async (email, password, doneCallback) => {
    //esta funcion toma los datos de arriva y se hace la validación.

    const user = await User.findOne({ email }) // buscamos el user en el model de la BD mongoose.

    if (!user) {
        return doneCallback(null, false, { message: "No se encontro el usuario" })
        //este call recibe ("un error", "si existe el usuario", "algunas opciones")
    } else {
        const match = await user.matchPass(password) // se verifica si 'password' ingresado en el input coincide con el 'matchPass' del Modal (el que esta encriptado).
        if (match) {
            return doneCallback(null, user, { message: 'LLEGO EL USUARIO' }) //"null" no hay error, guarda el usuario en la session del servidor.
        } else {
            return doneCallback(null, false, { message: 'Contraseña incorrecta' })
        }
    }
}))

// ¿como hace passport para guardar el usuario?
// Esto determina qué datos del usuario se deben almacenar en la session (aca sería el user.id de mongoose)
passport.serializeUser((user, doneCallback) => {
    doneCallback(null, user.id)
})

//Cuando el usuario comience a navegar y ya esté registrado, va a hacer consultas a la BD para ver si ese id tiene autorización.
passport.deserializeUser(async (id, doneCallback) => {
    const user = await User.findOne({ _id: id });
    doneCallback(null, user);
});