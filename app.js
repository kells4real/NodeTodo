const express = require('express')
const app = express()
const userRoute = require('./routes/users')
const adminRoute = require('./routes/admin')
const todoRoute = require('./routes/todos')
const mongoose = require('mongoose')

const auth = require("./middleware/auth");
const cors = require('cors')

require('dotenv/config')

app.set('view engine', 'ejs')

// Set cors urls
let whitelist = ['http://localhost', '127.0.0.1:8000']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())

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
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  
app.use('/admin', adminRoute)
app.use('/users', userRoute)
app.use('/todos', todoRoute)

// Listening to the server
app.listen(3000)