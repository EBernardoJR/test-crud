const express = require("express");
const router = express.Router()
const userController = require('./controllers/userController')
const itemsController = require('./controllers/ItemController')

router.get('/test', (req, res) => {
    return res.send('ok')
})
router.post('/signup', userController.create)
router.post('/signin', userController.login)
router.get('/user/:user_id', userController.index)
router.get('/items/:userId', itemsController.getByUser)
router.post('/items', itemsController.create)
router.post('/home', itemsController.getByNotUser)


module.exports = router