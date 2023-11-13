// for locate path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {v2 as cloudinary}  from "cloudinary";
import dotenv from "dotenv"
dotenv.config();
//  model
import fileModel from "../models/fileModel.js";

export const localFileUpload = async(req,res)=>{
    try 
    {
        // retrive file from request body
        const file = req.files.file;
        // create path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        //  move file to created path
        file.mv(path,(err)=>{
            console.log(err);
        });
        res.status(200).json({
            success:true,
            message:"File Uploaded Successfully",
        });
    } 
    catch (error)
    {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went Wrong",
        });
    }
}

export const imageUpload = async(req,res)=>
{
    try
    {
        // retrive data from req body
        const {name,tags,email} = req.body;
        const file = req.files.imageFile;

        // which file type supported
        const supportedTypes = ["jpg","jpeg","png","gif"];
        const fileType = `${file.name.split(".")[1].toLowerCase()}`;
        if(!isFileSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
        }

        // file supported
        const resp = await  uploadFilestoCloudinary(file,"dev",90);
        // console.log(resp);
        // database entry
        const fileData =  await fileModel.create({
            name,
            tags,
            email,
            imageUrl:resp.secure_url,
        });
        res.status(200).json({
            success:true,
            message:"Image Uploaded successfully",
            imageUrl:resp.secure_url,
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

export const videoUpload = async(req,res)=>{
    try
    {
        // retrive data from req body
        const {name,tags,email} = req.body;
        const file = req.files.videoFile;

        // which file type supported
        const supportedTypes = ["mp4","mov","webm"];
        const fileType = `${file.name.split(".")[1].toLowerCase()}`;
        if(!isFileSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
        }

        // file supported
        const resp = await  uploadFilestoCloudinary(file,"dev",90);
        // console.log(resp);
        // database entry
        const fileData =  await fileModel.create({
            name,
            tags,
            email,
            imageUrl:resp.secure_url,
        });
        res.status(200).json({
            success:true,
            message:"Video Uploaded successfully",
            imageUrl:resp.secure_url,
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

export const imageReduceUpload = async(req,res)=>{
    try
    {
        // retrive data from req body
        const {name,tags,email} = req.body;
        const file = req.files.imageFile;

        // which file type supported
        const supportedTypes = ["jpg","jpeg","png","gif"];
        const fileType = `${file.name.split(".")[1].toLowerCase()}`;
        if(!isFileSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File type not supported",
            });
        }

        // file supported
        const resp = await  uploadFilestoCloudinary(file,"dev",90);
        // console.log(resp);
        // database entry
        const fileData =  await fileModel.create({
            name,
            tags,
            email,
            imageUrl:resp.secure_url,
        });
        res.status(200).json({
            success:true,
            message:"Image Uploaded successfully",
            imageUrl:resp.secure_url,
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

//  utility functions
const isFileSupported = (type,supportedTypes)=>{
    return supportedTypes.includes(type);
}

const uploadFilestoCloudinary = async(file,folder,quality)=>{
    if(!quality)
    {
        return res.status(400).json({
            success:false,
            message:"Something went wrong in qulaity",
        });
    }
    const options = {folder,api_secret:process.env.API_SECRET,resource_type:"auto",quality:quality};
    
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}