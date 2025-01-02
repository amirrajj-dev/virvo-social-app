import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import connectToDb from "./db/connectToDb.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import path from 'path'

const app = express();
dotenv.config();

app.use(express.static(process.cwd() + '/backend/public'))

app.use(express.json({limit : '5mb'})); //to parse json
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(cookieParser()); //to be able to access cookies through req.cookies.cookiename instead of undefined

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(process.env.PORT, async () => {
  await connectToDb();
  console.log(`Server is running on port ${process.env.PORT}✅🤖`);
});
