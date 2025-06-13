const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {getAllPosts,createPost}=require('../controllers/post')

router.get('/', auth,getAllPosts);

router.post('/', auth,createPost);


module.exports = router; 