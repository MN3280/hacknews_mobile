const express = require('express')
const router = express.Router()
const UserController = require("../controllers/userController")


router.get('/', UserController.readUser)
router.post('/register', UserController.register)
router.get('/:id', UserController.getOne)
router.delete('/:id', UserController.deleteUser)

module.exports = router 