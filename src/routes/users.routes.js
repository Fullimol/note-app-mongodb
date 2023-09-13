const { Router } = require("express")
const router = Router()
const { renderSignUpForm, renderSignInpForm, signUp, signIn, logout } = require('../controllers/users.controllers')

router.get('/users/signup', renderSignUpForm)
router.post('/users/signup', signUp)

router.get('/users/signin', renderSignInpForm)
router.post('/users/signin', signIn)

router.get("/users/logout", logout)

module.exports = router