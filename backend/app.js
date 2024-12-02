import express from "express"
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import connectToDb from "./db/connectToDb.js"
const app = express()
dotenv.config()

app.use('/api/auth' , authRoutes)

app.get('/' , (req , res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${process.env.PORT}✅🤖`)
})