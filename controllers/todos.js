const Todo = require('../models/Todo');

// Hard coded todos
const todos = [{
    "id": 1,
    "title": "First Todo",
    "description": "The very first todo.."
},
{
    "id": 2,
    "title": "Second Todo",
    "description": "The second todo.."  
},
{
    "id": 3,
    "title": "Third Todo",
    "description": "The very third todo.."
}]

// Todo controllers
const allTodos = async (req, res) => {
    try{
        const todos = await Todo.find()
        res.json(todos)
    }catch(e){
        res.json({message: e})
    }
}

const getTodo = async (req, res) => {

    try{
    const todo = await Todo.findById(req.params.id);
      if(todo){
        res.json(todo)
      }else{
          console.log(res.status(404).send("Todo not found"))
          res.status(404).send("Todo not found")
      }
    }catch(e){
        res.json({message: e})
    }
}

const createTodo = async (req, res) => {
    // res.send(req.body)
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    })
try{
    const savedTodo = await todo.save();
        res.json(savedTodo);
}catch(e){
    res.json({message: e})
}

}

const updateTodo = async (req, res) => {
    try{
        const updatedTodo = await Todo.updateOne({_id: req.params.id}, { 
            $set: {title: req.body.title, description: req.body.description}})
        res.json(updatedTodo)
        }catch(e){
            res.json({message: e})
        }
}

const deleteTodo = async (req, res) => {
    try{
    const deletedTodo = await Todo.remove({_id: req.params.id})
    res.json(deleteTodo)
    }catch(e){
        res.json({message: e})
    }
}

module.exports = {
    allTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}