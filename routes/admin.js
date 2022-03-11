const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {'message': 'Admin Page'})
})

module.exports = router