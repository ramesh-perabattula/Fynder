const User=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

const createAccount=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Email already registered"
            });
        }
         
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

         res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });    
    }
    catch(error){
        //console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            res.json({
                message:"email is required"
            });
        }
        if(!password){
            res.json({
                message:"password is required"
            })
        }
        const user = await User.findOne({ email });
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        const comaparePass=await bcrypt.compare(password, user.password);
        if(!comaparePass){
            res.json({
                message:"invalid credintails"
            })
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({token,user});
    }catch(error){
        res.json({message:error});
    }
}

module.exports={
    createAccount,
    login
}