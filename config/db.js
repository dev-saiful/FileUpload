import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectDB = (req,res)=>{
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser: true,
	    // useUnifiedTopology: true,
    })
    .then(console.log("MongoDB connected Successfully"))
    .catch((err)=>{
        console.log("Can't connect to MongoDB!!!");
        console.error(err);
        process.exit(1);
    });
}