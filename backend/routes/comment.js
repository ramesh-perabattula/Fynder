const express = require('express');
const router = express.Router();
const { getComments, addComment } = require('../controllers/comment');
const auth = require('../middleware/auth');

// Get comments for a post
router.get('/post/:postId', (req, res) => getComments(req, res));

// Add a comment to a post
router.post('/post/:postId', auth, (req, res) => addComment(req, res));

module.exports = router;
