const express = require('express');
const {getComments,addComment}= require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/post/:postId',getComments);
router.post('/post/:postId', auth,addComment);

module.exports = router;
