const User=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

const createAccount=async(req,res)=>{
    try{
        console.log('before');
        const {name,email,password,role}=req.body;
        console.log('after')
        console.log(req.body);
        let user=await User.findOne({email});
        if(user){
            res.json({
                message:"user already exits"
            })
        }
         
        //hashing the pass before saing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user=new User({name,email,password:hashedPassword,role});
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role },
             process.env.JWT_SECRET, 
             { expiresIn: "7d" });

        res.json({token,user});    
    }
    catch(error){
        res.json({
           message: "error registering user"
        })
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