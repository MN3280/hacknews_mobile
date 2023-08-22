const express = require('express')
const router = express.Router()
const post = require('./post')
const category = require('./category')
const user = require('./user')
const dataErrors = require('../middlewares/errorHandler')

// router.use("/users", user)
router.use('/posts', post)
router.use('/categories', category)
router.use(dataErrors)
module.exports = router 