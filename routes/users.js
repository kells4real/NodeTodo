const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth");

const {allUsers,updateUser, getUser, deleteUser, registerUser, loginUser, checkUserExists, logOut} = require('../controllers/users')

router.get('/', auth, allUsers)

 // Register User
router.post("/register/", registerUser);
    
    // Login User
router.post("/login/", loginUser);
router.put("/logout/",auth, logOut);

router.get('/check/:email/', checkUserExists)
router.route('/:id/').get(auth, getUser).patch(auth, updateUser).delete(auth, deleteUser)

// router.param('id', (req, res, next, id) => {
    
// })



module.exports = router