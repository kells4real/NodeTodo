const Todo = require('../models/Todo');
const User = require('../models/User');

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
        description: req.body.description,
        user: req.body.user
    })
    // const user = await User.findById(req.body.user)
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
            $set: {title: req.body.title, description: req.body.description, user: req.body.user}})
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