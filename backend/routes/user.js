import express from "express";
import user from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// signup - route
router.post('/sign-up' , async(req , res)=>{
    try {
        const {username , email , password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(username.length  < 7) {
            return res.status(400).json({message: "User must have 7 characters"}); 
        }
        if(password.length  < 10) {
            return res.status(400).json({message: "Password must have 10 characters"}); 
        }

        // Check user exists or not 
        const existingEmail = await user.findOne({email: email});
        const existingUsername = await user.findOne({username: username});
        if(existingEmail || existingUsername){
            return res.status(400).json({message: "Username or Email Already Exist"});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass  = await bcrypt.hash(password,salt);
        const newUser = new user({username , email ,password: hashedPass});
        await newUser.save();
        return res.status(200).json({message : "Account created"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

// signin -  route 
router.post('/sign-in' , async(req , res)=>{
    try {
        const {email , password} = req.body;
        if( !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
          // Check User exists or not 
          const existingUser = await user.findOne({email: email});
          if(!existingUser ){
              return res.status(400).json({message: "Invalid Credentials"});
          }

        //   Check Password Matching or Not 
        const isMatch = await bcrypt.compare(password ,existingUser.password  )
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // Generate JWT Token
        const token = jwt.sign({id: existingUser._id , email: existingUser.email}, process.env.JWT_SECRET , {expiresIn:"365d"});

        res.cookie("podcasterUserToken", token , {
            httpOnly: true ,
            maxAge: 60 * 24 * 60 * 60 * 100 , // 60 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // 'none' for cross-site requests in production
        });

        res.status(200).json({
            id: existingUser._id,
            username: existingUser.username,
            email: email,
            message: "Sign-in Succesfully"
        });
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
});

// Logout 
router.post('/logout' , async(req , res)=>{
    res.clearCookie("podcasterUserToken",{
        httpOnly: true,
    });
   return res.status(200).json({message: "Logged out Successfully"});
});

// check cookie present or not 
router.get('/check-cookie' , async(req , res)=>{
    const token = req.cookies.podcasterUserToken;
    if(token){
      return  res.status(200).json({message : true });
    }
   return res.status(200).json({message : false });

});

// Route to fetch user details 
router.get('/user-details' ,authMiddleware, async(req , res) =>{
    try {
        const { email } = req.user;
        const existingUser = await user.findOne({email: email}).select(
            "-password"
        );
        return res.status(200).json({user : existingUser});
    } catch (error) {
       return res.status(500).json({message : error.message}); 
    }
});

export default router;