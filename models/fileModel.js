import mongoose from "mongoose";

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

const fileModel = mongoose.model("File",fileSchema);
export default fileModel;