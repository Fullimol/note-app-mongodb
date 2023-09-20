const { Router } = require("express")
const router = Router()
const { renderNoteForm, createNewNote, renderNotes, renderEditNotes, updateNote, deleteNote } = require('../controllers/notes.controllers')
const { verificarAutenticacion } = require('../helpers/auth')

// New notes
router.get('/notes/add', verificarAutenticacion, renderNoteForm)
router.post('/notes/new-note', verificarAutenticacion, createNewNote)

// Get all note
router.get('/notes', verificarAutenticacion, renderNotes)

// Edit Notes
router.get('/notes/edit/:id', verificarAutenticacion, renderEditNotes)
router.put('/notes/edit/:id', verificarAutenticacion, updateNote)

// Delete Notes
router.delete('/notes/delete/:id', verificarAutenticacion, deleteNote)

module.exports = router