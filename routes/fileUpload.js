import express from "express";
import { 
    
    localFileUpload,
    imageUpload,
    videoUpload,
    imageReduceUpload } from "../controllers/fileController.js";

const router = express.Router();

// api route || hanlder function
router.post("/localfileupload",localFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagereduceupload",imageReduceUpload);

export default router;