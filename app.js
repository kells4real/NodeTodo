const express = require('express')
const app = express()
const userRoute = require('./routes/users')
const adminRoute = require('./routes/admin')
const todoRoute = require('./routes/todos')
const mongoose = require('mongoose')
require('dotenv/config')

app.set('view engine', 'ejs')

// app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Connect to MongoDB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
).then(() => console.log("Database connected!"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.status(200).json({"message": "Hello Express"})
})
app.use('/admin', adminRoute)
app.use('/users', userRoute)
app.use('/todos', todoRoute)

// Listening to the server
app.listen(3000)