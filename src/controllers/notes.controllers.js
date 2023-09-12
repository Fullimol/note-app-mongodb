const Note = require('../models/Note')

const renderNoteForm = (req, res) => {
    res.render("notes/new-note")
}

const createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title: title, description: description }) //Guardo los valores correspondientes a lo que recibe el Schema
    await newNote.save()  //Al operar con la BD es un operacion Asíncrona. Hay que usar ASYNC.
    res.redirect('/notes')
}

const renderNotes = async (req, res) => {
    const notes = await Note.find().lean() // ".lean()" se utiliza para ejecutar una consulta a la base de datos y obtener los resultados como documentos JavaScript simples en lugar de obtener documentos de tipo Mongoose con todos los métodos y funcionalidades de Mongoose adjuntos. (!) Sin esto no funciona el #each en el .hbs
    res.render('notes/all-notes', { notes }) //El segundo parametro es para pasarle la data de "notes" al .hbs y poder mostrarlo.
}

const renderEditNotes = (req, res) => {
    res.send("Render EDIT form")
}

const updateNote = (req, res) => {
    res.send("Update Note")
}

const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
}

module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditNotes,
    updateNote,
    deleteNote
}