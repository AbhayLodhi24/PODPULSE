import {Router} from "express";
import Cat from "../models/category.js";
const router = Router();

// Add Category
router.post('/add-category',async (req , res) => {
    const {categoryName } = req.body;
    const cat = new Cat({categoryName});
    await cat.save();
    return res.status(200).json({message : "Category added"});
} );

export default router;