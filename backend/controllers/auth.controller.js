import generateTokenAndSetCookie from "../libs/utils/generateToken.js";
import usersModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

export const signup = async (req , res)=>{
    try {
        const {username , email , fullName , password} = req.body;
        if (!username || !email || !fullName || !password){
            return res.status(400).json({message : "Please fill all the fields" })
        }
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail){
            return res.status(400).json({message : "Invalid email" , success : false});
        }
        if (password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters" , success : false})
        }
        const userExist = await usersModel.findOne({
            $or : [{username : username} , {email : email}]
        })

        if (userExist){
            return res.status(400).json({message : "User already exist" , success : false});
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await usersModel.create({
            username ,
            email ,
            fullName ,
            password : hashedPassword
        })
        if (user){
            generateTokenAndSetCookie(user._id , res)
            res.status(201).json({message : "User created successfully" , success : true , data : user})
        }
    } catch (error) {
        return res.status(500).json({message : 'internal server error :(' , success : false , error : error.message})
    }
}

export const login = async (req , res)=>{
    try {
        const {username , password} = req.body;

        if (!username || !password){
            return res.status(400).json({message : "Please fill all the fields" , success : false});
        }

        if (password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters" , success : false})
        }

        const user = await usersModel.findOne({username})
        if (!user){
            return res.status(401).json({message : "Invalid username or password" , success : false});
        }
        const isValidPassword = await bcrypt.compare(password , user.password)
        if (!isValidPassword){
            return res.status(401).json({message : "Invalid username or password" , success : false});
        }
        await generateTokenAndSetCookie(user._id , res)
        res.status(200).json({message : "Logged in successfully" , success : true})
        
    } catch (error) {
        return res.status(500).json({message : 'internal server error :(' , success : false , error : error.message})
    }
}

export const logout = async (req , res)=>{
    try {
        res.cookie('token' , '' , {
            expires : new Date(0),  // Cookie will be cleared
            maxAge : 0
        })
        res.status(200).json({message : "Logged out successfully" , success : true})
    } catch (error) {
        res.status(500).json({message : 'error logging out' , error : error.message})
    }
}

export const getMe = async (req , res)=>{
    try {
        const user = await usersModel.findById(req.user._id).select('-password')
        if (!user){
            return res.status(404).json({message : "User not found" , success : false});
        }
        res.status(200).json({message : "User fetched successfully" , success : true , data : user})
    } catch (error) {
        return res.status(500).json({message : 'internal server error :(' , success : false , error : error.message})
    }
}