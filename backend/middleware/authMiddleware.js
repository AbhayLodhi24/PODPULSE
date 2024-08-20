import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async(req , res , next)=>{
    const token = req.cookies.podcasterUserToken;
    try {
        if(token){
           const decode = jwt.verify(token ,process.env.JWT_SECRET ) ;
           const user = await User.findById(decode.id);
           if(!user){
            return res.status(404).json({message: "User not Found"});
           }
           req.user = user;
           next();
        }
    } catch (error) {
        return res.status(500).json({message : "Invalid Token"});
    }
}

export default authMiddleware;