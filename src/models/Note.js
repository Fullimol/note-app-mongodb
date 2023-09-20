const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    // este lo agrege a lo ultimo del proyecto:
    user: {
        type: String,
        require: true
    }
}, {
    timestamps: true //Esto se agrega para que, por defecto agrege la fecha de cuando fue creado y cuando actualizado.
})

module.exports = model('Note', NoteSchema)