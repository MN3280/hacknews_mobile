const express = require('express')
const router = express.Router()
const CategoryController = require("../controllers/categoryController")


router.get("/", CategoryController.readCategory);
router.post("/createCategory", CategoryController.createCategory);
router.delete("/:id", CategoryController.deleteCategory)




module.exports = router 