const User = require("../models/User")

const renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

const signUp = async (req, res) => {
    const errors = [] //cada vez que se cumpla un if, va a guardar el texto de error en este array. Luego se muestra por hbs en el .render
    const { name, email, password, confirm_password } = req.body
    if (password != confirm_password) {
        errors.push({ text: "La contraseña no coincide" })
    }
    if (password.length < 4) {
        errors.push({ text: "La contraseña debe tener mínimo 4 caracteres" })
    }
    if (errors.length > 0) {
        res.render("users/signup", { errors, name, email })
        console.log("ERRORES:", errors)
    } else {

        const emailUser = await User.findOne({ email: email }) //Busca en la BD si existe un "email" guardado que coincide con el "email" del input.
        if (emailUser) {
            req.flash("mensage_error", "Usuario ya existe")
            res.redirect("signup")
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encriptarPass(password) //se utiliza la dependcia bcryptjs para encriptar y luego guardarla en la BD
            await newUser.save()
            // req.flash("mensage_exito", "Usuario registrado con éxito") //NO ESTÁ FUNCIONANDO EL MENSAGE DE EXITO
            res.redirect("signin")
        }

    }
}

const renderSignInpForm = (req, res) => {
    res.render('users/signin')
}

const signIn = (req, res) => {
    res.send("sign In")
}

const logout = (req, res) => {
    res.send("log out")
}

module.exports = {
    renderSignUpForm,
    signUp,
    renderSignInpForm,
    signIn,
    logout
}