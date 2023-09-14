const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

//Esto es para encriptar el password el usuario y no quede guardado tal cual. Se utiliza el modulo "bcryptjs" por npm.
UserSchema.methods.encriptarPass = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//Esto es para comparar la password encriptada que ingresa el usuario con la password encriptada de la base de datos.
UserSchema.methods.matchPass = async function (password) { //(!)No se usa arrow porque sino no puedo usar "this" y acceder al valor de la password del schema.
    await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)