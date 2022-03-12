const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");


const allUsers = async (req, res) => {
    try{
    users = await User.find()
    res.json(users)
    }catch(e){
        res.send(e)
    }
}


const getUser = async (req, res) => {
    const user = User.findById(req.params.id);
    try{
      if(user){
        const data = await user.populate({path: 'todos', select: 'title'});
        res.status(200).json({success: true, data});
      }else{
          console.log(res.status(404).send("User not found"))
          res.status(404).send("User not found")
      }
    }catch (e){
        res.json({message: e})
    }
}

const registerUser = async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (e) {
        res.json({message: e});
      }
      // Our register logic ends here
}

const loginUser = async (req, res) => {

    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (e) {
        res.json({message: e});
      }
      // Our register logic ends here
    
}


const updateUser = async (req, res) => {
    
    try{
        const updatedUser = await User.updateOne({_id: req.params.id}, { 
            $set: {first_name: req.body.first_name, last_name: req.body.last_name}})
            if(updateUser){
            const user = await User.findById(req.params.id)
            res.json(user)
            }
        }catch(e){
            res.json({message: e})
        }
}

const deleteUser = (req, res) => {
    res.send("Delete Route")
}

module.exports = {
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
}