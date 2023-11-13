import mongoose from "mongoose";
import nodemailer from "nodemailer";

const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});


// post middleware
fileSchema.post("save",async(doc)=>{
    try
    {
        // create a transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // mail send
        let info = await transporter.sendMail({
            from:`RaddSoft Thecnology`,
            to:doc.email,
            subject:`File Uploaded to Cloudinary`,
            html:`<h2>File Uploaded</h2> 
                    <p>Check File</p> 
                    <br> 
                    <a href="${doc.imageUrl}">View File</a>`,

        });
    } 
    catch (error)
    {
        console.error(error);
    }
})

const fileModel = mongoose.model("File",fileSchema);
export default fileModel;