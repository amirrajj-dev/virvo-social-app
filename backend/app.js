import express from "express"
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import connectToDb from "./db/connectToDb.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()

app.use(express.json()) //to parse json
app.use(express.urlencoded({ extended : true})) //to parse form data
app.use(cookieParser())
app.use('/api/auth' , authRoutes) //to be able to access cookies through req.cookies.cookiename instead of undefined

app.get('/' , (req , res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${process.env.PORT}✅🤖`)
})