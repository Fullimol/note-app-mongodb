const renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

const signUp = (req, res) => {
    res.send("sign Up")
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