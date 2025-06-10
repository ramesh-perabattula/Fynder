const express = require("express");
const router = express.Router();
const {newPost,getPosts,deletePost}=require('../controllers/post');
const protect=require('../middleware/auth');


router.post("/",protect,newPost);

 

router.get("/", protect,getPosts);


router.delete("/:id",protect,deletePost);

module.exports = router;
