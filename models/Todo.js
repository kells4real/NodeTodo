const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
    },
    user: {type: Schema.Types.ObjectId,
         ref: 'Users', required: true
    }
})

module.exports = mongoose.model('Todos', TodoSchema)