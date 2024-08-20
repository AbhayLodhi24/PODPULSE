import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import Category from "../models/category.js";
import Podcast from "../models/podcast.js";
import User from "../models/user.js";

const router = Router();

// Add Podcast
router.post("/add-podcast",authMiddleware , upload ,async (req, res) => {
   try {
    const { title , description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;
    if(!title || !description || !category || !frontImage || !audioFile){
      return res.status(400).json({message : "All Fields are required"});  
    }
    const {user} = req ;
    const cat = await Category.findOne({categoryName : category});
    if(!cat){
        return res.status(400).json({message : "No Category Found"});   
    }
    const catId = cat._id;
    const userId = user._id;
    const newPodcast = new Podcast({title , description , category:catId , frontImage , audioFile , user: userId});
    await newPodcast.save();
    await Category.findByIdAndUpdate(catId ,{
        $push: {podcasts: newPodcast._id},
    } );
    await User.findByIdAndUpdate(userId, {
        $push: {podcasts: newPodcast._id},
    });

    return res.status(201).json({message: "Podcast added successfully"});

   } catch (error) {
    return res.status(500).json({message: error.message});
   }
});

// Get all podcasts
router.get("/get-podcasts", async (req, res) => {
    try {
        const podcasts = await Podcast.find().populate("category").sort({createdAt: -1});
        return res.status(200).json({data : podcasts});
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
});

// Get-user-podcasts
router.get("/get-user-podcasts" , authMiddleware , async(req , res)=>{
    try{
        const {user} = req ;
        const userId = user._id ;
        const data = await User.findById(userId).populate({path: "podcasts" ,
            populate: {path: "category"},
        }).select("-password");

        if(data && data.podcasts){
            data.podcasts.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt));
        }

        return res.status(200).json({
            data : data.podcasts
        });
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
});

// get podcast by id
router.get('/get-podcast/:id' , async(req ,res)=>{
    try {
        const {id} = req.params ;
        const podcasts = await Podcast.findById(id).populate("category");
        return res.status(200).json({data : podcasts});
    } catch (error) {
       return res.status(500).json({message : error.message}); 
    }
});

// get podcast by categories
router.get('/category/:cat' , async(req ,res)=>{
    try {
        const {cat} = req.params ;
        const categories = await Category.find({categoryName : cat}).populate({
            path:"podcasts" ,
            populate: {path: "category"},
        });

        let podcasts = [];
        categories.forEach((category)=>{
           podcasts = [...podcasts , ...category.podcasts] ;
        });
        return res.status(200).json({data : podcasts});
    } catch (error) {
       return res.status(500).json({message : error.message}); 
    }
});

export default router ;