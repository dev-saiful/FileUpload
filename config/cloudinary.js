import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv';
dotenv.config();


export const connectCloudinary = ()=>{
    try
    {
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secrect: process.env.API_SECRET,
        });
    }
    catch(err)
    {
        console.log(err);
    }
}