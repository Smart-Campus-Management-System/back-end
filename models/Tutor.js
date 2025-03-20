const mongoose = require('mongoose')

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expertise:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tutor', tutorSchema)