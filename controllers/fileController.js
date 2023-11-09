// for locate path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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