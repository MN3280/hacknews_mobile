const express = require('express')
const router = express.Router()
const PostController = require("../controllers/postController")

router.get("/", PostController.readArticle);
router.get("/renderbycat", PostController.readArticleByCats)
router.get("/:id", PostController.RenderPostDetail)
router.post("/createPost", PostController.createPost); //bisa add tags ny 3
router.delete("/:id", PostController.deletePostById);
router.put("/:id", PostController.editPost);




module.exports = router 