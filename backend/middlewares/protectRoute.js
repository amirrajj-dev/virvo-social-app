import usersModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
const protectRoute = async (req  , res, next)=>{
    try {
        const token = req.cookies.token
        if (!token){
            return res.status(401).json({error: 'No token, authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded){
            return res.status(401).json({error: 'Invalid token, authorization denied'});
        }
        const user = await usersModel.findById(decoded.userId)
        if (!user){
            return res.status(401).json({error: 'User not found, authorization denied'});
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({error: 'Server error, authorization denied' , error});
    }
}

export default protectRoute;