const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post('/signup', async(req,res)=>{
    try{
        const {name, email, password} = req.body;

        const userExit = await User.findOne({email});

        if(userExit){
            return res.status(404).json({message:"User already exits"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, 
            email, 
            password : hashedPassword
        })

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res.status(201).json({message:"User signed up successfully", user:newUser, token});
    }
    catch(err){
        return res.status(500).json({message:"Server Error", error:err.message});
    }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) return res.status(400).json({ msg: "Invalid" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });


router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }


        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,{expiresIn: "1d"});

        // Remove password before sending
        const userData = user.toObject();
        delete userData.password;


        return res.status(200).json({message:"User login Successfully", user: userData, token});
    }

    catch(err){
        return res.status(500).json({message:"Server Error", error:err.message});
    }
});


module.exports = router;
