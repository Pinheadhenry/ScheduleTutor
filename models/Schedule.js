const mongoose = require('mongoose')


const scheduleSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Map,
        required: true
    }
})

module.exports = mongoose.model("Schedule", scheduleSchema)