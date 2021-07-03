const express = require("express");
const router = express.Router()
const userController = require('./controllers/userController')

router.get('/test', (req, res) => {
    return res.send('ok')
})
router.post('/signup', userController.create)
router.post('/signin', userController.login)
router.get('/user/:user_id', userController.index)


module.exports = router