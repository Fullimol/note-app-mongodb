const helpers = {}

//Este es un middleware que va en la ruta para que verifique si el usuario está logeado o no.

helpers.verificarAutenticacion = (req, res, next) => {
    // si el usuario esta logeado, se permite navegar por las url.
    if (req.isAuthenticated()) { //"isAuthenticated" es una funcionalidad que se añade por la dependencia passport.
        return next()
    } else {
        req.flash('mensage_error', "Debes logearte para ingresar.")
        res.redirect('/users/signin') //si no lo está, al querer ingresar por la url a las notas, este se va a redirigír.
    }
}

module.exports = helpers