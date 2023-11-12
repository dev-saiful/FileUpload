import express from "express";
import dotenv from "dotenv";
dotenv.config();
import fileUpload from "express-fileupload";
import {connectDB} from "./config/db.js"
import {  connectCloudinary  } from "./config/cloudinary.js"
import Upload from "./routes/fileUpload.js"

const app = express();
const PORT = process.env.PORT || 6001 

// adding middlewares
app.use(express.json());
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:"/tmp/",
    }
));

// connect to db and media server
connectDB();
connectCloudinary();

// routes
app.use("/api/v1/upload",Upload);

// default
app.get("/",(req,res)=>{
    res.send("Default Route");
});

// server active
app.listen(PORT,()=>{
    console.log(`localhost:${PORT}`);
});