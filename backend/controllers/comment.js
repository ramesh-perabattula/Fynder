const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const comment = new Comment({ post: postId, author: req.user._id, content: content.trim() });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};
