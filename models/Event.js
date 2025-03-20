const mongoose = require("mongoose")

const eventShema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Event", eventShema)