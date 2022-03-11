const express = require('express')
const router = express.Router()

const {allUsers, createUser, updateUser, getUser, deleteUser} = require('../controllers/users')

router.get('/', allUsers)
router.post('/new', createUser)


router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

// router.param('id', (req, res, next, id) => {
    
// })



module.exports = router