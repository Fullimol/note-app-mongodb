const renderIndex = ("/", (req, res) => {
    res.render('index')
})

const renderAbout = ("/about", (req, res) => {
    res.render('about')
})

module.exports = {
    renderIndex,
    renderAbout
}