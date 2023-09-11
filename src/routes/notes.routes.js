const { Router } = require("express")
const router = Router()
const { renderNoteForm, createNewNote, renderNotes, renderEditNotes, updateNote, deleteNote } = require('../controllers/notes.controllers')

// New notes
router.get('/notes/add', renderNoteForm)
router.post('/notes/new-note', createNewNote)

// Get all note
router.get('/notes', renderNotes)

// Edit Notes
router.get('/notes/edit/:id', renderEditNotes)
router.put('/notes/edit/:id', updateNote)

// Delete Notes
router.delete('/notes/delete/:id', deleteNote)

module.exports = router