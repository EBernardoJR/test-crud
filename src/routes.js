const express = require("express");
const router = express.Router()
const userController = require('./controllers/userController')
const itemsController = require('./controllers/ItemController')
const multer = require('multer')
const multerConfig = require('./configs/multer')

router.get('/test', (req, res) => {
    return res.send('ok')
})
router.post('/signup', userController.create)
router.post('/signin', userController.login)
router.get('/user/:user_id', userController.index)
router.get('/items/:userId', itemsController.getByUser)
router.post('/items', multer(multerConfig).single('file'), itemsController.create)
router.get('/home/:userId', itemsController.getByNotUser)


module.exports = router