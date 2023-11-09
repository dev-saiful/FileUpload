import express from "express";
import { 
    
    localFileUpload } from "../controllers/fileController.js";

const router = express.Router();

// api route || hanlder function
router.post("/localfileupload",localFileUpload);

export default router;