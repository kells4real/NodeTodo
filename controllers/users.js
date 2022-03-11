
// Hard coded users
const users = [{
    "id": 1,
    "first_name": "Henry",
    "last_name": "Okeleke"
},
{
    "id": 2,
    "first_name": "Kells",
    "last_name": "Sajere"   
},
{
    "id": 3,
    "first_name": "Zane",
    "last_name": "Sajere"
}]

const allUsers = (req, res) => {
    res.status(200).json(users)
}

const getUser = (req, res) => {
    let user = users.find(obj => {
        return obj.id === parseInt(req.params.id)
      });
      if(user){
        res.json(user)
      }else{
          console.log(res.status(404).send("User not found"))
          res.status(404).send("User not found")
      }
}

const createUser = (req, res) => {
    res.send({"Message": "Post"})
}

const updateUser = (req, res) => {
    res.send("Put Route")
}

const deleteUser = (req, res) => {
    res.send("Delete Route")
}

module.exports = {
    allUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}