const express = require('express')
const router = express.Router()
const {allTodos, createTodo, updateTodo, getTodo, deleteTodo} = require('../controllers/todos')
const auth = require("../middleware/auth");


router.get('/', auth, allTodos)
router.post('/new/',auth, createTodo)


router.route('/:id/').get(auth, getTodo).patch(auth, updateTodo).delete(auth, deleteTodo)

// router.param('id', (req, res, next, id) => {
    
// })


module.exports = router

