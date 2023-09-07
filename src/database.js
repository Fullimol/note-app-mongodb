// Este archivo tiene la conexión a la base de datos.
const mongoose = require("mongoose")
const { NOTES_APP_MONGODB_HOS, NOTES_APP_MONGODB_DATABASE } = process.env

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOS}/${NOTES_APP_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

    .then(db => console.log("La base de datos esta conectada :)"))
    .catch(err => console.log("HUBO UN ERROR: ", err))