const mongoose = require('mongoose')


const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todos', TodoSchema)