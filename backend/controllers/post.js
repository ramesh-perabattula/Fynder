const mongoose=require('mongoose');
const Post=require('../models/post');
const User=require('../models/user');

const newPost =async (req, res) => {
    try {
        const { type, title, description, image, location, user } = req.body;
        const newPost = new Post({ type, title, description, image, location, user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
}

const getPosts=async(req,res)=>{
     try {
        const posts = await Post.find().populate("user", "name");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
}

const deletePost=async(res,req)=>{
     try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
}

module.exports={
    newPost,
    getPosts,
    deletePost
}