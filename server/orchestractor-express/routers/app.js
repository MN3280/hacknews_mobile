const express = require('express')
const router = express.Router()
const AppController = require("../controllers/appController")


router.get("/", AppController.readArticle);
router.post("/add", AppController.createPost); //bisa add tags ny 3
router.get("/:id", AppController.RenderPostDetail)
router.delete("/:id", AppController.deletePostById);
router.put("/:id", AppController.editPost);

module.exports = router 