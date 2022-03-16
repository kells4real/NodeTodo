const Todo = require('../models/Todo');
const User = require('../models/User');

// Todo controllers
const allTodos = async (req, res) => {
    const loggedIn = await User.findById(req.user.user_id);
    try{
        const todos = await Todo.find({user: loggedIn._id}).sort({"date": -1})
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
    
    const todo = new Todo({
        title: req.body.title,
        user: req.user.user_id
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
    const loggedIn = await User.findById(req.user.user_id);
    const todo = await Todo.findById(req.params.id);

    try{
        // I converted the loggedIn and todo id objects to string because for some reason, they don't equate to the same even when they are
        // I would need to do a research about why this is, this doesn't happen in the users controller
        if (todo.user.toString() === loggedIn._id.toString()){
        const updatedTodo = await Todo.updateOne({_id: req.params.id}, { 
            $set: {title: req.body.title, completed: req.body.completed}})
        const newTodo = await Todo.findById(req.params.id);
        res.json(newTodo)
        }else{
            res.status(401).json({message: "User Unauthorised!"})
        }
        }catch(e){
            res.json({message: e})
        }
}

const deleteTodo = async (req, res) => {
    const loggedIn = await User.findById(req.user.user_id);
    const todo = await Todo.findById(req.params.id);
    try{
         // I converted the loggedIn and todo id objects to string because for some reason, they don't equate to the same even when they are
        // I would need to do a research about why this is, this doesn't happen in the users controller
        if (loggedIn._id.toString() === todo.user.toString()){
    const deletedTodo = await Todo.deleteOne({_id: req.params.id})
        res.status(200).json({message: "Task Deleted!"})
        }else{
            res.status(401).json({message: "User Unauthorised!"})
        }
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