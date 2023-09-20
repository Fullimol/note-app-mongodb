const Note = require('../models/Note')

const renderNoteForm = (req, res) => {
    res.render("notes/new-note")
}

const createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title: title, description: description }) //Guardo los valores correspondientes a lo que recibe el Schema
    newNote.user = req.user.id  //a "newNote" que se guarda en BD, le agrego el id del user (este "user" se encuentra en la session creada con passport)
    await newNote.save()  //Al operar con la BD es un operacion Asíncrona. Hay que usar ASYNC.
    req.flash('mensage_exito', 'Nota creada con exito')//Midleware para pasar un mensaje a la siguiente url.
    res.redirect('/notes')
}

const renderNotes = async (req, res) => {
    //buscar todas las notas que el user id coincida con el user de la session.
    const notes = await Note.find({user: req.user.id}).lean() // ".lean()" se utiliza para ejecutar una consulta a la base de datos y obtener los resultados como documentos JavaScript simples en lugar de obtener documentos de tipo Mongoose con todos los métodos y funcionalidades de Mongoose adjuntos. (!) Sin esto no funciona el #each en el .hbs
    res.render('notes/all-notes', { notes }) //El segundo parametro es para pasarle la data de "notes" al .hbs y poder mostrarlo.
}

const renderEditNotes = async (req, res) => {
    const note = await Note.findById(req.params.id).lean()
    if (note.user != req.user.id){  //si en la url llegas a poner el id de la nota de otro usuario, como no coincide el user de la nota con el id del user de la session, te va a redirigír.
        return res.redirect('/notes')
    }
    res.render("notes/edit-note", { note: note })
}

const updateNote = async (req, res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, { title: title, description: description })
    req.flash("mensage_exito", "Nota actualizada con exito")
    res.redirect("/notes",)
}

const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash("mensage_exito", "Nota eliminada con exito")
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