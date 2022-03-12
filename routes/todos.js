const express = require('express')
const router = express.Router()
const {allTodos, createTodo, updateTodo, getTodo, deleteTodo} = require('../controllers/todos')


router.get('/', allTodos)
router.post('/new', createTodo)


router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)

// router.param('id', (req, res, next, id) => {
    
// })


module.exports = router

